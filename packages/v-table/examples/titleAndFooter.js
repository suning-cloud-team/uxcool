import Vue from 'vue';
import '@suning/v-table/css/index.scss';
import VTable from '@suning/v-table';

function getColumns() {
  return [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '地址',
      dataIndex: 'companyAddress',
      key: 'companyAddress',
    },
    {
      title: '性别',
      dataIndex: 'gender',
      key: 'gender',
    },
  ];
}

const vm = new Vue({
  el: '#app',
  components: {
    VTable,
  },
  data: {
    columns: [],
  },
  created() {
    this.columns = getColumns.call(this);
  },
  methods: {
    emptyText() {
      return 'NO NO DATA DATA';
    },
  },
});
