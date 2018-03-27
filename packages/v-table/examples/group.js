import Vue from 'vue';
import '@suning/v-table/css/index.scss';
import VTable from '@suning/v-table';

function getColumns() {
  return [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 100,
      fixed: 'left',
      filters: [
        {
          text: 'Joe',
          value: 'Joe',
        },
        {
          text: 'John',
          value: 'John',
        },
      ],
      onFilter: (value, record) => record.name.indexOf(value) === 0,
    },
    {
      title: 'Other',
      children: [
        {
          title: 'Age',
          dataIndex: 'age',
          key: 'age',
          width: 200,
          sorter: (a, b) => a.age - b.age,
        },
        {
          title: 'Address',
          children: [
            {
              title: 'Street',
              dataIndex: 'street',
              key: 'street',
              width: 200,
            },
            {
              title: 'Block',
              children: [
                {
                  title: 'Building',
                  dataIndex: 'building',
                  key: 'building',
                  width: 100,
                },
                {
                  title: 'Door No.',
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
      title: 'Company',
      children: [
        {
          key: 'companyAddress',
          title: 'Company Address',
          dataIndex: 'companyAddress',
        },
        {
          key: 'companyName',
          title: 'Company Name',
          dataIndex: 'companyName',
        },
      ],
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      width: 60,
      fixed: 'right',
    },
  ];
}

function getData(cnt = 10) {
  return Array(cnt)
    .fill(0)
    .map((v, i) => ({
      key: i,
      name: 'John Brown',
      age: i + 1,
      street: 'Lake Park',
      building: 'C',
      number: 2035,
      companyAddress: 'Lake Street 42',
      companyName: 'SoftLake Co',
      gender: 'M',
    }));
}

const vm = new Vue({
  el: '#app',
  components: {
    VTable,
  },
  data: {
    columns: [],
    data: getData.call(this, 100),
  },
  created() {
    this.columns = getColumns.call(this);
  },
});
