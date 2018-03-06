import Vue from 'vue';

import VMenu, { VMenuItem, VSubMenu } from '@suning/v-menu';

import '@suning/v-menu/assets/index.css';

const vm = new Vue({
  el: '#app',
  components: {
    VMenu,
    VMenuItem,
    VSubMenu,
  },
  data: {
    mode: 'horizontal',
    selectedKeys: [2, 3],
    menus: Array(10)
      .fill(0)
      .map((v, i) => ({
        name: i,
        value: `a-${i}`,
      })),
  },
  methods: {
    onItemClick(a, e) {
      console.log(a, e.item);
    },
    onChange(e) {
      console.log('cjange');
    },
  },
});
