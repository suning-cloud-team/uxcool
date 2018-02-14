import Vue from 'vue';

import '@suning/v-dialog/css/index.scss';

import VDialog from '@suning/v-dialog';

const vm = new Vue({
  el: '#app',
  data: {
    visible: false,
    title: 'title1',
  },
  methods: {
    onClick() {
      this.visible = true;
    },
    getContainer() {
      return document.querySelector('#dialogContainer');
    },
  },
  components: {
    VDialog,
  },
});
