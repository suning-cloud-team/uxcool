import Vue from 'vue';

import '@cloud-sn/v-dialog/css/index.scss';

import VDialog from '@cloud-sn/v-dialog';

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
