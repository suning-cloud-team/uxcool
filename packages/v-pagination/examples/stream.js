import Vue from 'vue';
import Pagination from '@cloud-sn/v-pagination';

import '@cloud-sn/v-pagination/assets/index.css';

new Vue({
  components: {
    UxPagination: Pagination,
  },
  methods: {
    paginationChange(...args) {
      console.log(...args);
    },
  },
}).$mount('#app');
