import Vue from 'vue';
import '@suning/v-dropdown/css/index.scss';
import VDropdown from '@suning/v-dropdown';
import { VMenu, VSubMenu, VMenuItem } from '@suning/v-menu';

const vm = new Vue({
  el: '#app',
  components: {
    VMenu,
    VSubMenu,
    VMenuItem,
    VDropdown,
  },
});
