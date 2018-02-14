import Vue from 'vue';
import '@suning/v-table/css/index.scss';
import VTable from '@suning/v-table';

function getColumns() {
  return [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '其它',
      children: [
        {
          title: '年龄',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: '住址',
          children: [
            {
              title: '街道',
              dataIndex: 'street',
              key: 'street',
            },
            {
              title: '小区',
              children: [
                {
                  title: '单元',
                  dataIndex: 'building',
                  key: 'building',
                },
                {
                  title: '门牌',
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
      dataIndex: 'gender',
      key: 'gender',
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
  },
  created() {
    this.columns = getColumns.call(this);
  },
});
