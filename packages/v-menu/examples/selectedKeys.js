import Vue from 'vue';

import VMenu, { VMenuItem, VSubMenu } from '@cloud-sn/v-menu';

import '@cloud-sn/v-menu/css/index.scss';

const vm = new Vue({
  el: '#app',
  components: {
    VMenu,
    VMenuItem,
    VSubMenu,
  },
  data: {
    mode: 'horizontal',
    selectedKeys: ['2', 3],
    menus: [],
  },
  created() {
    setTimeout(() => {
      this.menus = Array(10)
        .fill(0)
        .map((v, i) => ({
          name: i,
          value: `a-${i}`,
        }));
    }, 2500);
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
