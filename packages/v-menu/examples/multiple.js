import Vue from 'vue';

import '@cloud-sn/v-menu/css/index.scss';
import VMenu, { VMenuItem, VMenuItemGroup, VSubMenu } from '@cloud-sn/v-menu';

const vue = new Vue({
  el: '#app',
  methods: {
    onSelect(info) {
      console.log('select', info.selectedKeys);
    },
    onDeselect(info) {
      console.log('deselect', info.selectedKeys);
    },
    onOpenChange(visible) {
      console.log('open-change', visible);
    },
  },
  components: {
    VMenu,
    VSubMenu,
    VMenuItem,
    VMenuItemGroup,
  },
});
