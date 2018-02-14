import Vue from 'vue';
import Pagination from '@suning/v-pagination';

import '@suning/v-pagination/assets/index.css';

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
