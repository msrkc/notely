<template>
  <div class="sidebar">
    <div v-if="notes.length">
      <note v-for="note in notes" :note="note" :key="note._id"></note>
    </div>
    <div class="sidebar__content" v-else>
      Boo, no notes. Get writing!
    </div>
  </div>
</template>

<script>
import Note from "./Note";
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters(["notes"])
  },
  methods: {
    ...mapActions(["getNotes"])
  },
  components: {
    Note
  },
  created() {
    this.getNotes();
  }
};
</script>

<style lang="stylus" scoped>
.sidebar {
  background-color: bg-color;
  flex: 1;
  height: 100%;
  min-width: 28%;
  overflow-y: scroll;

  &::-webkit-scrollbar-track {
    background-color: white-color;
  }

  &::-webkit-scrollbar {
    width: 5px;
    background-color: white-color;
  }

  &::-webkit-scrollbar-thumb {
    background-color: white-color;
  }

  &:hover {
    &::-webkit-scrollbar-thumb {
      background-color: scroll-hover-color;
    }
  }
}
</style>
