import Vue from 'vue';
import '@cloud-sn/v-table/css/index.scss';
import VTable from '@cloud-sn/v-table';

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
  const h = this.$createElement;
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
      onHeaderCell(...args) {
        return {
          colspan: 2,
          on: {
            click(e) {
              console.log(...args);
            },
          },
        };
      },
      onCell(...args) {
        return {
          on: {
            click() {
              console.log('cell', ...args);
            },
          },
        };
      },
      cellRender(text, record, rowIdx) {
        const col = {};
        if (rowIdx === 3) {
          col.colspan = 5;
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
      onHeaderCell() {
        return {
          colspan: 0,
        };
      },
      cellRender: renderCell,
    },
    {
      title: 'title3',
      dataIndex: 'c',
      key: 'c',
      width: 200,
      onCell(...args) {
        return {
          on: {
            click() {
              console.log('cell', ...args);
            },
          },
        };
      },
      cellRender: renderCell,
    },
    {
      title: 'Operations',
      dataIndex: '',
      key: 'd',
      onHeaderCell(...args) {
        return {
          on: {
            click() {
              console.log('operations', ...args);
            },
          },
        };
      },
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
      cellRender(text, ...args) {
        // 暂不支持html渲染,请使用jsx
        return {
          content: <span style="color:red"> {text} </span>,
          // dangerouslySetInnerHTML: true,
          style: {
            fontSize: '16px',
          },
          className: ['b', 'c'],
          ...renderCell.call(this, text, ...args),
        };
      },
    },
    {
      title: 'todo',
      onCell(record) {
        console.log(record);
        return {
          style: {
            color: 'green',
          },
        };
      },
      cellRender() {
        return <VTodo name="todo-name" />;
      },
    },
    {
      title: 'other',
      cellRender(text, record, rowIdx) {
        const h = this.$createElement;
        const col = {
          content: h(
            {
              render() {
                const { name } = this;
                return h('span', [name, ' ', this.$slots.default]);
              },
              props: {
                name: String,
              },
            },
            {
              props: {
                name: 'abc',
              },
            },
            ['innerContent']
          ),
        };
        if (rowIdx === 1) {
          col.rowspan = 2;
        }
        if (rowIdx === 2) {
          col.rowspan = 0;
        }
        return col;
      },
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
      key: '3',
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
  methods: {
    onClick() {
      console.log('click');
    },
  },
});
