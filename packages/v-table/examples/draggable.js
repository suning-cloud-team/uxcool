import Vue from 'vue';
import '@suning/v-table/css/index.scss';
import VTable from '@suning/v-table';

function getCols() {
  return [
    {
      key: 'name',
      title: 'Name',
      dataIndex: 'name',
      cellRender(text) {
        return <a href="#">{text}</a>;
      },
    },
    {
      key: 'age',
      title: 'Age',
      dataIndex: 'age',
    },
    {
      key: 'addr',
      title: 'Addr',
      dataIndex: 'address',
    },
    {
      title: 'Action',
      cellRender(_, record) {
        return (
          <span>
            <a href="#">Action-{record.name}</a>
            <a href="#">Delete</a>
          </span>
        );
      },
    },
  ];
}
function getCols2() {
  return [
    {
      key: 'name',
      title: 'Name',
      width: 200,
      fixed: 'left',
      dataIndex: 'name',
      cellRender(text) {
        return <a href="#">{text}</a>;
      },
    },
    {
      key: 'age',
      title: 'Age',
      dataIndex: 'age',
    },
    {
      key: 'addr',
      title: 'Addr',
      dataIndex: 'address',
    },
    {
      title: 'Action',
      cellRender(_, record) {
        return <div style={{ height: `${30 + record.key * 10}px` }}>{record.name}</div>;
      },
    },
  ];
}

function getData() {
  return Array.from({ length: 5 }, (_, i) => ({
    key: i,
    name: `name ${i}`,
    age: `name ${i}`,
    address: `name ${i}`,
    description: `description ${i}`,
  }));
}

const vm = new Vue({
  el: '#app',
  components: {
    VTable,
  },
  data: {
    columns: [],
    columns2: [],
    data: [],
  },
  created() {
    this.columns = getCols.call(this);
    this.columns2 = getCols2.call(this);
    this.data = getData.call(this, this.columns);
  },
  methods: {
    expandedRowRender(record) {
      return <p>{record.description}</p>;
    },
    onDragStart(...args) {
      console.log('start', ...args);
    },
    onDragEnter(...args) {
      console.log('enter', ...args);
    },
    onDragOver(...args) {
      console.log('over', ...args);
    },
    onDragLeave(...args) {
      console.log('leave', ...args);
    },
    onDragEnd(...args) {
      console.log('end', ...args);
    },
    onDrop(...args) {
      console.log('drop', ...args);
    },
  },
});
