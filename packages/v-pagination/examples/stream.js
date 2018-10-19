import Vue from 'vue';
import Pagination from '@suning/v-pagination';

import '@suning/v-pagination/assets/index.css';

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
