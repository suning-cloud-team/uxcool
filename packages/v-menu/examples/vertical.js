import Vue from 'vue';

import '@suning/v-menu/css/index.scss';
import VMenu, { VMenuItem, VMenuItemGroup, VSubMenu } from '@suning/v-menu';

const vue = new Vue({
  el: '#app',
  components: {
    VMenu,
    VSubMenu,
    VMenuItem,
    VMenuItemGroup,
  },
  methods: {
    openSubMenu(openKeys) {
      console.log(openKeys);
    },
  },
});
