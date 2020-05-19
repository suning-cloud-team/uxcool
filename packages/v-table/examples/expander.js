import Vue from 'vue';
import '@cloud-sn/v-table/css/index.scss';
import VTable from '@cloud-sn/v-table';

function getColumns() {
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
      fixed: 'left',
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
      fixed: 'right',
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
    },
  ];
}

function getData() {
  return [
    {
      name: 'l0',
      age: 32,
      address: 'I am a',
      children: [
        {
          name: 'l01',
          age: 33,
          address: 'I am aa',
        },
        {
          key: '$l02',
          name: 'l02',
          age: 33,
          address: 'I am ab',
          children: [
            {
              name: 'l020',
              age: 33,
              address: 'I am aba',
            },
          ],
        },
        {
          key: '$l03',
          name: 'l03',
          age: 33,
          address: 'I am ac',
          children: [
            {
              key: '$l030',
              name: 'l030',
              age: 33,
              address: 'I am aca',
              children: [
                {
                  name: 'l0300',
                  age: 33,
                  address: 'I am acaa',
                },
                {
                  name: 'l0301',
                  age: 33,
                  address: 'I am acab',
                },
              ],
            },
          ],
        },
      ],
    },
    {
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
    expandAllRows: false,
    expandedRowKeys: [],
  },
  created() {
    this.columns = getColumns.call(this);
    this.data = getData.call(this);
  },
  methods: {
    expandAll() {
      this.expandAllRows = !this.expandAllRows;
    },
    expandedRow() {
      this.expandedRowKeys = ['$l03', '$l02'];
    },
    onExpand(...args) {
      console.log('onExpand', ...args);
    },
    onExpandRowChange(...args) {
      console.log('onExpandRowChange', ...args);
    },
  },
});
