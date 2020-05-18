import Vue from 'vue';
import VMenu, { VMenuItem, VMenuItemGroup, VSubMenu } from '@cloud-sn/v-menu';

import '@cloud-sn/v-menu/css/index.scss';

const vm = new Vue({
  el: '#app',
  methods: {
    onClick(e) {
      console.log(e);
    },
    onChange() {
      console.log('onChange');
    },
  },
  components: {
    VMenu,
    VMenuItem,
    VMenuItemGroup,
    VSubMenu,
  },
});
