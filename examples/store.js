import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const mutations = {
  changeTheme(state, theme) {
    const nState = state;
    nState.theme = theme;
  },
};
const store = new Vuex.Store({
  state: {
    theme: 'light',
  },
  mutations,
});

export default store;
