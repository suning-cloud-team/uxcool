import Vue from 'vue';
import '@suning/v-table/css/index.scss';
import VTable from '@suning/v-table';

function getColumns() {
  const self = this;
  return [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      fixed: 'left',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      cellRender(age, record) {
        const onClick = (record) => {
          record.height += 20;
          const { table } = self.$refs;
          if (table) {
            table.forceUpdate(false);
          }
        };
        return (
          <div onClick={() => onClick(record)} style={{ height: `${record.height}px` }}>
            {age} {record.height}
          </div>
        );
      },
    },
    {
      title: '城市',
      dataIndex: 'city',
      key: 'city',
      width: 200,
      fixed: 'right',
    },
  ];
}

function getData() {
  return Array.from({ length: 1000 }, (_, i) => ({
    key: `${i}`,
    name: `name ${i}`,
    age: `age ${i}`,
    city: `city ${i}`,
    height: 20,
    children: [
      {
        key: `${i}-0`,
        name: `name ${i}-0`,
        age: `age ${i}-0`,
        city: `city ${i}-0`,
        height: 20,
      },
      {
        key: `${i}-1`,
        name: `name ${i}-1`,
        age: `age ${i}-1`,
        city: `city ${i}-1`,
        height: 20,
      },
    ],
  }));
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
    this.data = getData.call(this);
  },
  methods: {},
});
