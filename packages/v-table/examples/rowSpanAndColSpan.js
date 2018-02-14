import Vue from 'vue';
import '@suning/v-table/css/index.scss';
import VTable from '@suning/v-table';

// @vue/component
const VTodo = {
  props: {
    name: { type: String, default: '' },
  },
  render() {
    const { name } = this;
    return (
      <div>
        <span>this is {name}</span>
      </div>
    );
  },
};

function renderCell(text, record, rowIdx) {
  // 需手动声明h
  // eslint-disable-next-line
  // const h = this.$createElement;
  const col = {};
  if (rowIdx === 3) {
    col.colspan = 0;
  }
  return col;
}

function getColumns() {
  return [
    {
      title: 'title1',
      dataIndex: 'a',
      key: 'a',
      width: 100,
      cellRender(text, record, rowIdx) {
        const col = {};
        if (rowIdx === 3) {
          col.colspan = 7;
        }
        return col;
      },
    },
    {
      id: '123',
      title: 'title2',
      dataIndex: 'b',
      key: 'b',
      width: 100,
      cellRender: renderCell,
    },
    {
      title: 'title3',
      dataIndex: 'c',
      key: 'c',
      width: 200,
      cellRender(text, record, rowIdx, colIdx) {
        const col = { ...renderCell.call(this, text, record, rowIdx, colIdx) };
        if (rowIdx === 0) {
          col.rowspan = 2;
        }
        if (rowIdx === 1) {
          col.rowspan = 0;
        }
        return col;
      },
    },
    {
      title: 'Operations',
      dataIndex: '',
      key: 'd',
      cellRender(...args) {
        return {
          content: <a href="#">Operations</a>,
          ...renderCell.call(this, ...args),
        };
      },
    },
    {
      key: 'e',
      title: 'html',
      dataIndex: 'b',
      cellRender: renderCell,
    },
    {
      title: 'todo',
      cellRender(...args) {
        return {
          content: <VTodo name="todo-name" />,
          ...renderCell.call(this, ...args),
        };
      },
    },
    {
      title: 'other',
      cellRender(...args) {
        const col = {
          content: <a>operator</a>,
          ...renderCell.call(this, ...args),
        };
        return col;
      },
    },
  ];
}

function getData(columns) {
  return [
    {
      a: '123',
      b: 'aaaa',
      c: 'c1111',
      d: '3333',
      key: '1',
    },
    {
      a: 'cdd',
      b: 'edd',
      c: 'c2222',
      d: '4444',
      key: '2',
    },
    {
      a: '1333',
      b: 'b333333',
      c: 'c3333',
      d: 2,
      key: '3',
    },
    {
      a: `colspan=${columns.length}`,
      c: 'c4444',
      d: 2,
      key: '3',
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
