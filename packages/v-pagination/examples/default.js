import Vue from 'vue';
import Pagination from '@cloud-sn/v-pagination';

import '@cloud-sn/v-pagination/assets/index.css';

const vm = new Vue({
  el: '#app',
  methods: {
    paginationChange(...args) {
      console.log(...args);
    },
  },
  components: {
    Pagination,
  },
});
