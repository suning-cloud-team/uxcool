import Vue from 'vue';
import '@cloud-sn/v-table/css/index.scss';
import VTable from '@cloud-sn/v-table';

function getColumns() {
  return [
    {
      fixed: 'left',
      width: 100,
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '其它',
      children: [
        {
          title: '年龄',
          width: 50,
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: '住址',
          children: [
            {
              title: '街道',
              width: 80,
              dataIndex: 'street',
              key: 'street',
            },
            {
              title: '小区',
              children: [
                {
                  title: '单元',
                  width: 100,
                  dataIndex: 'building',
                  key: 'building',
                },
                {
                  title: '门牌',
                  width: 50,
                  dataIndex: 'number',
                  key: 'number',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      title: '公司',
      children: [
        {
          title: '地址',
          dataIndex: 'companyAddress',
          key: 'companyAddress',
          cellRender(text) {
            return (
              <span>
                {text}
                <br />
                {text}
              </span>
            );
          },
        },
        {
          title: '名称',
          width: 200,
          dataIndex: 'companyName',
          key: 'companyName',
        },
      ],
    },
    {
      title: '性别',
      dataIndex: 'gender',
      key: 'gender',
    },
  ];
}

const data = [
  {
    key: '1',
    name: 'abc',
    age: 32,
    street: 'street1123',
    building: 1,
    number: 2033,
    companyAddress: 'street1123 company',
    companyName: '123123',
    gender: '男',
  },
  {
    key: '2',
    name: 'adfsdf',
    age: 42,
    street: 'street 11111',
    building: 3,
    number: 2035,
    companyAddress: '123111',
    companyName: '1aadsfas',
    gender: '男',
  },
];
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
    setTimeout(() => {
      this.data = data;
    }, 1500);
  },
  methods: {
    onRow() {
      return {
        on: {
          click(...args) {
            console.log('click', args);
          },
        },
      };
    },
  },
});
