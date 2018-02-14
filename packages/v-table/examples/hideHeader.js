import Vue from 'vue';
import '@suning/v-table/css/index.scss';
import VTable from '@suning/v-table';

function getColumns() {
  return [
    {
      title: '姓名',
      dataIndex: 'a',
      key: 'name',
      width: '20%',
    },
    {
      title: '年龄',
      dataIndex: 'b',
      key: 'age',
      width: '20%',
    },
    {
      title: '地址',
      dataIndex: 'c',
      key: 'companyAddress',
      width: '20%',
    },
    {
      title: '性别',
      dataIndex: 'd',
      key: 'gender',
    },
  ];
}

function getData(columns) {
  return [
    { a: '123', key: '1' },
    { a: 'cdd', b: 'edd', key: '2' },
    {
      a: '1333',
      c: 'eee',
      d: 2,
    },
    {
      a: `colspan=${columns.length}`,
      c: 'eee',
      d: 2,
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
    data: [],
  },
  created() {
    this.columns = getColumns.call(this);
    this.data = getData.call(this, this.columns);
  },
  methods: {},
});
