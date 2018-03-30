<template>
  <div class="demo">
    <h6> sort and filter</h6>

    <ux-table :theme="theme"
              :columns="columns"
              v-model="data"
              @change="onChange" />
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import { Divider, Table as UxTable } from '@suning/uxcool';

  function getCols() {
    return [
      {
        key: 'name',
        title: 'Name',
        dataIndex: 'name',
        filters: [
          {
            text: 'Joe',
            value: 'Joe',
          },
          {
            text: 'Jim',
            value: 'Jim',
          },
          {
            text: 'John',
            value: 'John',
          },
        ],
        onFilter(a, record) {
          return record.name.includes(a);
        },
        sorter(a, b) {
          return a.name.length - b.name.length;
        },
      },
      {
        key: 'age',
        title: 'Age',
        dataIndex: 'age',
        sorter(a, b) {
          return a.age - b.age;
        },
      },
      {
        key: 'addr',
        title: 'Addr',
        dataIndex: 'address',
        filters: [
          {
            text: 'London',
            value: 'London',
          },
          {
            text: 'New York',
            value: 'New York',
          },
        ],
        onFilter(v, record) {
          return record.address.includes(v);
        },
        sorter(a, b) {
          return a.address.length - b.address.length;
        },
        defaultSortOrder: 'descend',
        // sortOrder: 'descend',
      },
    ];
  }

  function getData() {
    return [
      {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
      },
      {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
      },
      {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
      },
      {
        key: '4',
        name: 'Jim User',
        age: 99,
        address: 'Sidney No. 1 Lake Park',
      },
    ];
  }

  export default {
    components: {
      UxTable,
      Divider,
    },
    data() {
      return {
        columns: [],
        data: [],
      };
    },
    computed: mapState(['theme']),
    created() {
      this.columns = this.getCols();
      this.data = getData.call(this);
    },
    methods: {
      getCols,
      onChange(_, filterInfo, sort) {
        // console.log('sort', sort);
        // this.columns = this.getCols();
      },
    },
  };
</script>
