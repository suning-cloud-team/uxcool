import Vue from 'vue';

import '../css/index.scss';

import { VTabs, VTabPane } from '../src';

Vue.config.productionTip = false;

const vm = new Vue({
  el: '#app',
  components: {
    VTabs,
    VTabPane,
  },
  data: {
    count: 0,
  },
  methods: {
    add() {
      this.count += 1;
    },
  },
});
