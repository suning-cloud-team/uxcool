import Vue from 'vue';
import '@suning/v-table/css/index.scss';
import VTable from '@suning/v-table';

function getColumns() {
  return [
    {
      title: '姓名',
      dataIndex: 'a',
      key: 'name',
      width: '100',
    },
    {
      title: '年龄',
      dataIndex: 'b',
      key: 'age',
      width: '500',
    },
    {
      title: '地址',
      dataIndex: 'c',
      key: 'companyAddress',
      width: '400',
    },
    {
      title: '性别',
      dataIndex: 'd',
      width: '200',
    },
    {
      title: '姓名',
      dataIndex: 'b',
      width: '100',
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

// function getColumns() {
//   return [
//     {
//       title: 'title1',
//       dataIndex: 'a',
//       key: 'a',
//       width: 100,
//     },
//     {
//       title: 'title2',
//       dataIndex: 'b',
//       key: 'b',
//       width: 100,
//     },
//     {
//       title: 'title3',
//       dataIndex: 'c',
//       key: 'c',
//       width: 100,
//     },
//     {
//       title: 'title4',
//       dataIndex: 'b',
//       key: 'd',
//       width: 100,
//     },
//     {
//       title: 'title5',
//       dataIndex: 'b',
//       key: 'e',
//       width: 100,
//     },
//     {
//       title: 'title6',
//       dataIndex: 'b',
//       key: 'f',
//       width: 100,
//     },
//     // {
//     //   title: 'title7',
//     //   dataIndex: 'b',
//     //   key: 'g',
//     //   width: 10,
//     // },
//     // {
//     //   title: 'title8',
//     //   dataIndex: 'b',
//     //   key: 'h',
//     //   width: 100,
//     // },
//     // {
//     //   title: 'title9',
//     //   dataIndex: 'b',
//     //   key: 'i',
//     //   width: 100,
//     // },
//     // {
//     //   title: 'title10',
//     //   dataIndex: 'b',
//     //   key: 'j',
//     //   width: 100,
//     // },
//     // {
//     //   title: 'title11',
//     //   dataIndex: 'b',
//     //   key: 'k',
//     //   width: 100,
//     // },
//     // {
//     //   title: 'title12',
//     //   dataIndex: 'b',
//     //   key: 'l',
//     //   width: 100,
//     // },
//   ];
// }

// function getData() {
//   return [
//     {
//       a: '123',
//       b: 'xxxxxxxx xxxxxxxx',
//       d: 3,
//       key: '1',
//     },
//     {
//       a: 'cdd',
//       b: 'edd12221 edd12221',
//       d: 3,
//       key: '2',
//     },
//     {
//       a: '133',
//       c: 'edd12221 edd12221',
//       d: 2,
//       key: '3',
//     },
//     {
//       a: '133',
//       c: 'edd12221 edd12221',
//       d: 2,
//       key: '4',
//     },
//   ];
// }

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
