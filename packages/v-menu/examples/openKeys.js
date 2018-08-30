import Vue from 'vue';

import VMenu, { VMenuItem, VSubMenu } from '@suning/v-menu';

import '@suning/v-menu/css/index.scss';

const vm = new Vue({
  el: '#app',
  components: {
    VMenu,
    VMenuItem,
    VSubMenu,
  },
  data: {
    mode: 'horizontal',
    openKeys: ['2', 3],
    selectedKeys: ['c-22', 'c-55'],
    menus: [],
  },
  created() {
    this.menus = Array(10)
      .fill(0)
      .map((v, i) => ({
        name: i,
        value: `a-${i}`,
        children: [
          {
            name: `c-${i}${i}`,
            value: `ccc-${i}${i}`,
          },
          {
            name: `c-${i}${i}${i}`,
            value: `ccc-${i}${i}${i}`,
          },
        ],
      }));
    setTimeout(() => {
      // this.menus = Array(10)
      //   .fill(0)
      //   .map((v, i) => ({
      //     name: i,
      //     value: `a-${i}`,
      //     children: [
      //       {
      //         name: `c-${i}${i}`,
      //         value: `ccc-${i}${i}`,
      //       },
      //       {
      //         name: `c-${i}${i}${i}`,
      //         value: `ccc-${i}${i}${i}`,
      //       },
      //     ],
      //   }));
      this.openKeys = ['2'];
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
