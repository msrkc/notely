<template>
  <div class="header">
    <div class="header__left">
      <div class="header__logo"><strong>Notely</strong></div>
      <i
        class="fa fa-pencil-square-o header__left--new"
        aria-hidden="true"
        @click.prevent="clearCurrentNote"
      ></i>
    </div>
    <div class="header__right">
      <div
        class="header__username"
        @click="dropdown = !dropdown"
        v-click-outside="hide"
      >
        {{ username }} <i class="fa fa-angle-down" aria-hidden="true"></i>
        <div class="header__dropdown" v-if="dropdown">
          <a href="#" @click.prevent="logout">Logout</a>
          <a
            href="https://twitter.com/murats"
            target="_blank"
            rel="noopener noreferrer"
          >
            Follow me
          </a>
          <a
            href="http://github.com/msrkc/notely"
            target="_blank"
            rel="noopener noreferrer"
          >
            Source Code
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import * as auth from "../auth";
export default {
  name: "AppHeader",
  data: () => ({
    dropdown: false,
    username: auth.getUsername()
  }),
  methods: {
    ...mapActions(["clearCurrentNote"]),
    hide() {
      this.dropdown = false;
    },
    logout() {
      auth.logout();
      this.$router.push({ name: "home" });
    }
  }
};
</script>

<style lang="stylus" scoped>
.header
  display flex
  height 5rem
  background-color bg-color
  border-bottom 5px solid white-color
  font-size 2rem
  color orange-bold-color

  &__username
    cursor pointer
    position relative
    justify-self flex-end

  &__left
    min-width 28%
    padding-left 3rem
    border-right 5px solid white-color
    padding-top 1.3rem
    justify-content space-between
    display flex

    &--new
      margin-right 2rem
      cursor pointer

  &__right
    width 82%
    display flex
    justify-content flex-end
    padding-top 1.5rem
    padding-right 2rem
    font-size 1.7rem
    font-weight 700

  &__dropdown
    position absolute
    background white-color
    width 15rem
    margin-top 1rem
    font-weight 500
    border-radius 10px
    border 1px solid orange-light-color
    text-align left
    font-size 1.4rem
    display flex
    flex-direction column
    z-index 2
    height auto
    overflow hidden
    right 0

    a
      color default-color
      text-decoration none
      padding 1rem 2rem

      &:hover
        background orange-light-color

strong
  color default-color
</style>
