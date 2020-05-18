import Vue from 'vue';
import Pagination from '@cloud-sn/v-pagination';

import '@cloud-sn/v-pagination/assets/index.css';

const vm = new Vue({
  el: '#app',
  data() {
    return {
      current: 2,
      total: 180,
      pageSize: 20,
    };
  },
  created() {
    setTimeout(() => {
      this.current = 5;
      this.total = 80;
      this.pageSize = 40;
    }, 2500);
  },
  methods: {
    paginationChange(...args) {
      console.log(...args);
    },
  },
  components: {
    Pagination,
  },
});
