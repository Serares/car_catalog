import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    carsData:{
      masini:{},
      branduri:{}
    }
  },
  mutations: {
    appendData: (state, payload) => {
      state.carsData[payload.colection] = payload.data;
    }
  },
  actions: {
    addData: (context, payload) => {
      context.commit('appendData', payload)
    }
  },
  modules: {}
});
