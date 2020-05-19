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
