import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

Vue.directive("clickOutside", {
  bind(el, binding) {
    el.__ClickOutsideHandler__ = event => {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event);
      }
    };
    document.body.addEventListener("click", el.__ClickOutsideHandler__);
  },
  unbind(el) {
    document.body.removeEventListener("click", el.__ClickOutsideHandler__);
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
