import Vue from 'vue';
import {
  sync
} from 'vuex-router-sync';
import 'babel-polyfill';

import router from './router';
import store from './store';

import './registerGlobalComponent';
import './style/index.scss';

import App from './App.vue';

sync(store, router);
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
