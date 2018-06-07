import Vue from 'vue';
import '@suning/v-table/css/index.scss';
import VTable from '@suning/v-table';

function getColumns() {
  const { expandedRow } = this;
  return [
    {
      fixed: 'left',
      title: 'seq',
      cellRender(text, record, rowIdx) {
        return rowIdx;
      },
      width: 100,
    },
    {
      // fixed: 'left',
      title: 'Name',
      dataIndex: 'name',
      width: 400,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      width: 100,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      cellRender(text, record, rowIdx) {
        return rowIdx === 5 ? (
          <span>
            {text}
            <br />
            {text}
          </span>
          ) : null;
      },
    },
    {
      title: 'Operations',
      fixed: 'right',
      dataIndex: 'operation',
      key: 'x',
      width: 150,
      cellRender(_, record) {
        return <a on-click={() => expandedRow(record.key)}>展开</a>;
      },
    },
  ];
}

function getData() {
  return [
    {
      key: '$l03',
      name: 'l0',
      age: 32,
      address: 'I am a',
    },
    {
      key: '$l04',
      name: 'l1',
      age: 32,
      address: 'I am b',
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
    expandAllRows: true,
    expandedRowKeys: [],
  },
  created() {
    this.columns = getColumns.call(this);
    this.data = getData.call(this);
  },
  methods: {
    expandedRowClassName(...args) {
      console.log('expandedRowClassName', ...args);
      return {
        a: false,
        b: true,
        cd: 'aa',
      };
    },
    expandedRowRender(...args) {
      console.log(...args);
      return <p>abc</p>;
    },
    expandAll() {
      this.expandAllRows = !this.expandAllRows;
    },
    expandedRow(key) {
      const { expandedRowKeys } = this;
      if (key) {
        if (expandedRowKeys.indexOf(key) > -1) {
          this.expandedRowKeys = [];
        } else {
          this.expandedRowKeys = [key];
        }
      }
    },
    onExpand(...args) {
      console.log('onExpand', ...args);
    },
    onExpandRowChange(...args) {
      console.log('onExpandRowChange', ...args);
    },
  },
});
