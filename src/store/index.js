import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    carsData:{
      masini:[],
      branduri:[]
    }
  },
  mutations: {
    appendData: (state, payload) => {
      state.carsData[payload.collection] = payload.data;
    }
  },
  actions: {
    getDataToStore: (context, payload) => {
      context.commit('appendData', payload)
    }
  },
  modules: {}
});
