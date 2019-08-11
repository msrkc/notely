<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "notely",
  beforeCreate() {
    this.$store.dispatch("authenticate");
  }
};
</script>

<style>
* {
  box-sizing: border-box;
}
body,
html {
  margin: 0;
  padding: 0;
  height: calc(100vh - 5rem);
  font-size: 62.5%;
  font-family: "Signika", sans-serif;
}

body {
  color: default-color;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  font-size: 1.6rem;
}
</style>
