import Vue from 'vue';
import Vuex from 'vuex';

import globalState from './state';
import { UPDATE_NAV_PAGE_INDEX, CHANGE_TOGGLE_THEME, CHANGE_PAGE_NAME } from './mutation-types';

const isDebug = process.env.NODE_ENV === 'development';

Vue.use(Vuex);

const getters = {
  menuData(state) {
    return state.menuData;
  },
  routes(state) {
    return state.routes;
  },
  footerNavs(state) {
    const { footerNavData, navPageIndex } = state;
    let prev = null;
    let next = null;
    if (navPageIndex > 0) {
      prev = footerNavData[navPageIndex - 1];
    }

    if (navPageIndex < footerNavData.length - 1) {
      next = footerNavData[navPageIndex + 1];
    }
    return [prev, next];
  },
  selectedRouteName(state) {
    return state.route.name;
  },
};

const store = new Vuex.Store({
  strict: isDebug,
  state: globalState,
  getters,
  mutations: {
    [CHANGE_TOGGLE_THEME](state, theme) {
      const nState = state;
      nState.theme = theme;
    },
    toggleCodeExpanded(state) {
      const nState = state;
      nState.codeExpanded = !state.codeExpanded;
    },
    [UPDATE_NAV_PAGE_INDEX](state, idx) {
      const nState = state;
      nState.navPageIndex = idx;
    },
    [CHANGE_PAGE_NAME](state, name) {
      const nState = state;
      nState.pageName = name;
    },
  },
});

export default store;
