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
  modules: {
    form: {
      state: {
        userName: '',
        password: '',
      },
      mutations: {
        updateUserName(state, name) {
          const nState = state;
          nState.userName = name;
        },
        updatePassword(state, pwd) {
          const nState = state;
          nState.password = pwd;
        },
      },
    },
  },
  state: {
    theme: 'light',
  },
  mutations,
});

export default store;
