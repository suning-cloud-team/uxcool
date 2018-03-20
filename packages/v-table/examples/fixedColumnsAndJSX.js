import Vue from 'vue';
import '@suning/v-table/css/index.scss';
import VTable from '@suning/v-table';

Vue.component('AB', {
  render() {
    return <div style="color:green">{this.$slots.default}</div>;
  },
});
// function getColumns() {
//   // eslint-disable-next-line
//   const h = this.$createElement;
//   return [
//     {
//       title: <a-b>title1</a-b>,
//       fixed: 'left',
//       dataIndex: 'a',
//       key: 'a',
//       width: 100,
//     },
//     {
//       id: '123',
//       fixed: 'left',
//       title: <span style="color: red">title2</span>,
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
//       title: 'Operations',
//       dataIndex: '',
//       key: 'd',
//       width: 200,
//     },
//     {
//       key: 'e',
//       title: 'html',
//       dataIndex: 'b',
//       width: 200,
//     },
//     {
//       title: 'other',
//       width: 100,
//       cellRender() {
//         const h = this.$createElement;
//         const col = {
//           content: h(
//             {
//               render() {
//                 const { name } = this;
//                 return h('span', [name, ' ', this.$slots.default]);
//               },
//               props: {
//                 name: String,
//               },
//             },
//             {
//               props: {
//                 name: 'abc',
//               },
//             },
//             ['innerContent']
//           ),
//         };
//         return col;
//       },
//     },
//   ];
// }

function getColumns() {
  // eslint-disable-next-line
  const h = this.$createElement;
  return [
    {
      fixed: true,
      width: 100,
      title: <a-b>姓名</a-b>,
      dataIndex: 'name',
      key: 'name',
      cellRender(text) {
        console.log(text);
        return [text, 'extra name'];
      },
    },
    {
      title: '其它',
      fixed: 'left',
      children: [
        {
          title: <a-b>年龄</a-b>,
          dataIndex: 'age',
          key: 'age',
          width: 100,
        },
        {
          title: '住址',
          children: [
            {
              title: '街道',
              dataIndex: 'street',
              key: 'street',
              width: 100,
            },
            {
              title: '小区',
              children: [
                {
                  title: <a-b>单元</a-b>,
                  dataIndex: 'building',
                  key: 'building',
                  width: 100,
                },
                {
                  title: '门牌',
                  dataIndex: 'number',
                  key: 'number',
                  width: 100,
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
        },
        {
          title: '名称',
          dataIndex: 'companyName',
          key: 'companyName',
        },
      ],
    },
    {
      title: '性别',
      fixed: 'right',
      width: 200,
      dataIndex: 'gender',
      key: 'gender',
    },
  ];
}
function getData(columns) {
  // eslint-disable-next-line
  const h = this.$createElement;
  return [
    {
      key: '1',
      name: <a-b>abc</a-b>,
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
