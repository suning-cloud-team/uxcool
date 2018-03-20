import Vue from 'vue';

import '@suning/v-menu/css/index.scss';
import VMenu, { VMenuItem, VMenuItemGroup, VSubMenu } from '@suning/v-menu';

const vm = new Vue({
  el: '#app',
  data: {
    mode: 'horizontal',
    openKeys: [],
    selectedKeys: [],
  },
  mounted() {
    setTimeout(() => {
      console.log('change openKeys');
      this.openKeys = ['1', '2'];
    }, 2000);
    setTimeout(() => {
      console.log('change mode');
      // this.mode = 'inline';
    }, 5000);

    setTimeout(() => {
      console.log('change selectedKeys');
      this.selectedKeys = ['1111'];
    }, 7000);
    setTimeout(() => {
      console.log('change selectedKeys 2222');
      this.selectedKeys = ['2222'];
    }, 10000);
  },
  components: {
    VMenu,
    VMenuItem,
    VMenuItemGroup,
    VSubMenu,
  },
});
