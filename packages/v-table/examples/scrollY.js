import Vue from 'vue';
import '@cloud-sn/v-table/css/index.scss';
import VTable from '@cloud-sn/v-table';

function getColumns() {
  const h = this.$createElement;
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
      title: <span on-click={this.showBody}>{this.hasBody ? '隐藏' : '显示'}BODY</span>,
      dataIndex: 'a',
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
let seed = 0;
const vm = new Vue({
  el: '#app',
  components: {
    VTable,
  },
  data: {
    hasBody: true,
    columns: [],
    data: [],
  },
  computed: {
    bodyStyle() {
      return {
        display: this.hasBody ? '' : 'none',
      };
    },
  },
  watch: {
    hasBody(nVal, oVal) {
      if (nVal !== oVal) {
        this.columns = this.getColumns();
      }
    },
  },
  created() {
    this.columns = this.getColumns();
    this.data = getData.call(this, this.columns);
  },
  methods: {
    showBody() {
      this.hasBody = !this.hasBody;
    },
    getColumns,
    rowKey() {
      seed += 1;
      return `$roww${seed}`;
    },
  },
});
