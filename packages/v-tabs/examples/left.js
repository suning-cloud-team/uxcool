import Vue from 'vue';

import '@suning/v-tabs/css/index.scss';

import { VTabs, VTabPane } from '@suning/v-tabs';

Vue.config.productionTip = false;
const vm = new Vue({
  el: '#app',
  data: {
    panes: [],
    currentPane: '',
  },
  created() {
    this.panes = Array(5)
      .fill(0)
      .map((v, i) => ({
        tab: `test${i}`,
        name: `name${i}`,
        content: `test content${i}`,
        disabled: i % 3 === 0,
      }));

    this.currentPane = this.panes[0].name;
  },
  components: {
    VTabs,
    VTabPane,
  },
});
