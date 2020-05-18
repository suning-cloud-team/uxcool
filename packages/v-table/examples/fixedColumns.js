import Vue from 'vue';
import '@cloud-sn/v-table/css/index.scss';
import VTable from '@cloud-sn/v-table';

function getColumns() {
  // eslint-disable-next-line
  const h = this.$createElement;
  return [
    {
      title: 'title1',
      fixed: 'left',
      dataIndex: 'a',
      key: 'a',
      width: 100,
    },
    {
      id: '123',
      fixed: 'left',
      title: <span style="color: red">title2</span>,
      dataIndex: 'b',
      key: 'b',
      width: 100,
    },
    {
      title: 'title3',
      dataIndex: 'c',
      key: 'c',
      width: 100,
    },
    {
      title: 'Operations',
      dataIndex: '',
      key: 'd',
      width: 200,
    },
    {
      key: 'e',
      title: 'html',
      dataIndex: 'b',
      width: 200,
    },
    {
      title: 'other',
      width: 100,
      cellRender() {
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
  methods: {},
});
