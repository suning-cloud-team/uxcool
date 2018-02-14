import Vue from 'vue';

import VMenu, { VMenuItem, VSubMenu } from '@suning/v-menu';

import '@suning/v-menu/assets/index.css';

const vm = new Vue({
  el: '#app',
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
  components: {
    VMenu,
    VMenuItem,
    VSubMenu,
  },
});
