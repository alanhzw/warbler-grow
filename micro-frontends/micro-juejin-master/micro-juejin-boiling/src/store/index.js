import Vue from "vue";
import Vuex from "vuex";

import peopleStore from "@/store/modules/people";
import boilingStore from "@/store/modules/boiling";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { people: peopleStore, boiling: boilingStore }
});
