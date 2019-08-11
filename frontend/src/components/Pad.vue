<template>
  <div class="pad">
    <input
      type="text"
      class="pad__title"
      placeholder="Untitled note"
      v-model="note.title"
      @keydown="save"
    />
    <textarea
      class="pad__text"
      placeholder="Start writing..."
      v-model="note.body"
      @keydown="save"
    ></textarea>

    <footer class="pad__footer">
      <ul class="pad__footer-items">
        <li class="pad__footer-item">Words: {{ wordCount }}</li>
        <li class="pad__footer-item pad__footer-item--right">
          Last saved: {{ lastSaved }}
        </li>
      </ul>
    </footer>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters(["note", "lastSaved", "wordCount"])
  },
  methods: {
    ...mapActions(["saveNote", "startSaveTimeout"]),
    save() {
      if (!this.note._id) {
        this.saveNote();
        return;
      }

      this.startSaveTimeout();
    }
  }
};
</script>

<style lang="stylus" scoped>
.pad {
  flex: 4;
  display: flex;
  flex-direction: column;
  background-color: bg-color;

  &__title {
    max-width: 100%;
    border: 0;
    font: inherit;
    font-size: 1.6em;
    outline: none;
    padding: 20px;
    padding-left: 30px;
    padding-top: 25px;
    background: none;
  }

  &__text {
    flex: 1;
    max-width: 100%;
    margin: 0;
    padding: 20px 30px;
    border: 0;
    font: inherit;
    outline: none;
    resize: none;
    line-height: 2;
    background: none;
    -webkit-mask-image: linear-gradient(
      to bottom,
      transparent 0%,
      white-color 5%,
      bg-color 95%,
      transparent 100%
    );
  }

  &__footer {
    padding: 20px 30px;
  }
}

.pad__footer-items {
  display: flex;
  margin: 0;
  padding: 0;
  list-style-type: none;
}

.pad__footer-item {
  flex: 1;
  font-size: 0.9em;

  &--right {
    margin-left: auto;
    text-align: right;
  }
}
</style>
