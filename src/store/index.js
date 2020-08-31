import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 0,
  },

  actions: {
    increment(store) {
      store.commit("increment");
    },
    decrement(store) {
      store.commit("decrement");
    },
  },

  mutations: {
    increment(state) {
      state.count++;
    },
    decrement(state) {
      state.count--;
    },
  },

  strict: process.env.NODE_ENV !== "production",
});
