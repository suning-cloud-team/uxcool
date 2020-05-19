import Vue from 'vue';

import '@cloud-sn/v-tabs/css/index.scss';

import { VTabs, VTabPane } from '@cloud-sn/v-tabs';

Vue.config.productionTip = false;

const vm = new Vue({
  el: '#app',
  components: {
    VTabs,
    VTabPane,
  },
  data: {
    panes: [],
    currentPane: '',
    seed: 0,
    color: { color: 'green' },
  },
  created() {
    this.panes = Array(5)
      .fill(0)
      .map((v, i) => ({
        tab: `test${i % 2 === 0 ? 'a'.repeat(5) : i}`,
        name: `name${i}`,
        content: `test content${i}`,
      }));
    this.seed = this.panes.length;
    this.currentPane = this.panes[3].name;
  },
  methods: {
    onAdd() {
      const { panes, seed } = this;
      panes.push({
        tab: `test${seed % 2 === 0 ? 'a'.repeat(5) : seed}`,
        name: `name${seed}`,
        content: `test content${seed}`,
      });
      this.seed += 1;
    },
    onTabClick(tab, tabName, e) {
      console.log(tab, tabName, e);
    },
    onNextClick(e) {
      console.log(e);
    },
    onPrevClick(e) {
      console.log(e);
    },
    changeColor() {
      this.color = { color: 'red' };
    },
  },
});
