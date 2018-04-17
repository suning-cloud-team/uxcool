import Vue from 'vue';
import Pagination from '@suning/v-pagination';

import '@suning/v-pagination/assets/index.css';

const vm = new Vue({
  el: '#app',
  components: {
    Pagination,
  },
  data() {
    return {
      total: 0,
      current: 1,
      pageSize: 5,
    };
  },
  created() {
    setTimeout(() => {
      this.total = 9;
      this.current = 21;
      this.pageSize = 20;
    }, 1500);
  },
  methods: {
    paginationChange(...args) {
      console.log(...args);
    },
  },
});
