import Vue from 'vue';

import '@suning/v-tabs/css/index.scss';

import { VTabs, VTabPane } from '@suning/v-tabs';

Vue.config.productionTip = false;
const vm = new Vue({
  el: '#app',
  data: {
    panes: [],
    currentPane: '',
    position: 'top',
  },
  created() {
    this.panes = Array(15)
      .fill(0)
      .map((v, i) => ({
        tab: `test${i % 2 === 0 ? 'a'.repeat(5) : i}`,
        name: `name${i}`,
        content: `test content${i}`,
      }));

    this.currentPane = this.panes[0].name;
  },
  components: {
    VTabs,
    VTabPane,
  },
});
