import Vue from 'vue';

import '@suning/v-dialog/css/index.scss';

import VDialog from '@suning/v-dialog';

const vm = new Vue({
  el: '#app',
  components: {
    VDialog,
  },
  data: {
    visible: false,
    title: 'title1',
  },
  created() {
    setTimeout(() => {
      this.title = '测试用title1';
    }, 2500);
  },
  methods: {
    onClick() {
      this.visible = !this.visible;
    },
    onDestroy() {
      this.$destroy();
    },
  },
});
