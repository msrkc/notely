import Vue from "vue";
import Vuex from "vuex";
import * as auth from "./auth";
import { http } from "./http";
import moment from "moment";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    apiUrl: process.env.VUE_APP_API,
    username: null,
    userId: null,
    notes: [],
    note: {
      title: null,
      body: null,
      lastSaved: null,
      active: false
    },
    saveTimeout: null
  },
  getters: {
    notes(state) {
      const dateToString = date => {
        return Number(String(moment(date).format("YYYYDMhmmss")).slice(0,10));
      };
      return state.notes.sort((a, b) => {
        return dateToString(b["lastSaved"]) - dateToString(a["lastSaved"]);
      });
    },
    note(state) {
      return state.note;
    },
    lastSaved(state) {
      if (!state.note.lastSaved) {
        return "Never";
      }
      return moment(state.note.lastSaved).calendar();
    },
    wordCount(state) {
      if (!state.note.body || state.note.body.trim() === "") {
        return 0;
      }
      return state.note.body.trim().split(" ").length;
    }
  },
  mutations: {
    SET_NOTES(state, notes) {
      state.notes = notes;
    },
    SET_CURRENT_NOTE(state, note) {
      if (note === null) {
        state.note = {
          title: null,
          body: null,
          lastSaved: null
        };
        return;
      }
      state.note = note;
    },
    SET_CURRENT_NOTE_ID(state, id) {
      state.note._id = id;
    },
    DELETE_NOTE(state, id) {
      state.notes = state.notes.filter(note => {
        return note._id !== id;
      });
    },
    AUTHENTICATE(state) {
      state.isLoggedIn = auth.isLoggedIn();
      if (state.isLoggedIn) {
        state.username = auth.getUsername();
        state.userId = auth.getUserId();
      } else {
        state.userId = null;
        state.username = null;
      }
    },
    TOUCH_LAST_SAVED(state) {
      state.note.lastSaved = Date.now();
    },
    PREPEND_TO_NOTES(state, note) {
      state.notes.unshift(note);
    },
    SET_SAVE_TIMEOUT(state, { callback, delay }) {
      state.saveTimeout = setTimeout(callback, delay);
    },
    CLEAR_SAVE_TIMEOUT(state) {
      clearInterval(state.saveTimeout);
      state.saveTimeout = null;
    }
  },
  actions: {
    getNotes({ commit }) {
      return http()
        .get("/note")
        .then(notes => {
          commit("SET_NOTES", notes.data.notes);
        });
    },
    openNote({ commit }, note) {
      commit("SET_CURRENT_NOTE", note);
    },
    saveNote({ commit, dispatch, state }) {
      commit("TOUCH_LAST_SAVED");
      if (typeof state.note._id === "undefined") {
        commit("PREPEND_TO_NOTES", state.note);
        commit("SET_CURRENT_NOTE_ID", Date.now());
        dispatch("postNote", {
          note: {
            title: state.note.title,
            body: state.note.body
          }
        }).then(({ data }) => {
          commit("SET_CURRENT_NOTE_ID", data.note._id);
        });
      }
      dispatch("patchNote", {
        note: {
          _id: state.note._id,
          title: state.note.title,
          body: state.note.body,
          lastSaved: state.note.lastSaved
        }
      });
    },
    postNote({ state }, post) {
      return http().post("/note", post);
    },
    patchNote({ state }, patch) {
      return http().patch("/note", patch);
    },
    deleteNote({ state, commit }, id) {
      if (confirm("Are you sure?")) {
        http()
          .delete(`/note/${id}`)
          .then(() => commit("DELETE_NOTE", id));
      }
    },
    authenticate({ commit }) {
      commit("AUTHENTICATE");
    },
    clearCurrentNote({ commit, dispatch }) {
      dispatch("stopSaveTimeout");
      commit("SET_CURRENT_NOTE", null);
    },
    startSaveTimeout({ commit, dispatch, state }) {
      if (state.saveTimeout !== null) {
        return;
      }
      commit("SET_SAVE_TIMEOUT", {
        callback() {
          dispatch("saveNote");
          dispatch("stopSaveTimeout");
        },
        delay: 1000
      });
    },
    stopSaveTimeout({ commit }) {
      commit("CLEAR_SAVE_TIMEOUT");
    }
  }
});
