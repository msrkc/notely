<template>
  <div
    class="note"
    :class="[currentNote._id === note._id ? 'note__current' : '']"
  >
    <a href="#" class="note__delete" @click.prevent="deleteNote(note._id)">
      <span class="note__delete-icon"
        ><i class="fa fa-trash-o" aria-hidden="true"></i
      ></span>
    </a>
    <div class="note__content">
      <a href="#" class="note__title" @click.prevent="openNote(note)">
        <span v-if="note.title">{{ note.title }}</span>
        <span v-else>Untitled note</span>
      </a>
      <p class="note__body">
        <span v-if="note.body">{{ note.body }}</span>
        <span v-else><em>Empty</em></span>
      </p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  props: ["note"],
  methods: {
    ...mapActions(["openNote", "deleteNote"])
  },
  computed: {
    ...mapGetters({ currentNote: "note" })
  }
};
</script>

<style lang="stylus" scoped>
.note {
  display: flex;
  color: inherit;
  text-decoration: none;
  border-bottom: 2px solid note-border-color;
  opacity: 0.3;
  flex-direction: row;
  max-width: 100%;

  &__current {
    background: orange-light-color;
    opacity: 0.8;
  }

  &:hover {
    opacity: 1;

    .note__delete {
      margin-left: 0;
    }
  }

  &__content {
    padding: 30px;
    flex: 2;
    overflow: hidden;
  }

  &__title {
    display: block;
    font-size: 1em;
    margin: 0;
    font-weight: 500;
    text-decoration: none;
    color: inherit;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &:hover {
      text-decoration: underline;
    }
  }

  &__body {
    font-size: 0.9em;
    margin-bottom: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__delete {
    position: relative;
    margin-left: -50px;
    width: 50px;
    display: block;
    background: orange-bold-color;
    min-height: 100%;
    color: #fff;
    transition: margin-left 100ms ease-in-out;
  }

  &__delete-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.5em;
    font-weight: 600;
  }
}
</style>
