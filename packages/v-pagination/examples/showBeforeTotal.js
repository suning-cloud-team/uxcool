import Vue from 'vue';
import Pagination from '@cloud-sn/v-pagination';
import '@cloud-sn/v-pagination/assets/index.css';

const vm = new Vue({
  el: '#app',
  data: {
    paginationTotal: 260,
  },
  methods: {
    showTotal(total, pageSize, totalPage, pageNo, range) {
      return `共${total}条, 每页显示${pageSize}条, ${range[0]}-${range[1]} / ${total}条, 共${totalPage}页`;
    },
    paginationChange(p) {
      console.log(p);
    }
  },
  components: {
    Pagination
  }
});
