<template>
  <div class="demo">
    <h6>reset sort and filter</h6>
    <p>使用filteredValue和sortOrder字段时,视为受控模式, 请与table的change事件共同使用 </p>
    <div class="ux-btn"
         @click="setNameFilter">set name filter = John</div>
    <div class="ux-btn"
         @click="sortAge">
      sort Age
    </div>
    <div class="ux-btn"
         @click="clearFilter">
      clear filter
    </div>
    <div class="ux-btn"
         @click="clearSort"> clear sort</div>
    <ux-table :columns="columns"
              v-model="data"
              @change="onChange" />
  </div>
</template>

<script>
  import { Divider, Table as UxTable } from '@suning/uxcool';

  function getCols() {
    const { filterInfo, sortInfo } = this;
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
        // 此处对应column的key字段,当前为name
        filteredValue: filterInfo.name,
        onFilter(a, record) {
          return record.name.includes(a);
        },
        sorter(a, b) {
          return a.name.length - b.name.length;
        },
        sortOrder: sortInfo.columnKey === 'name' ? sortInfo.order : null,
      },
      {
        key: 'age',
        title: 'Age',
        dataIndex: 'age',
        sorter(a, b) {
          return a.age - b.age;
        },
        sortOrder: sortInfo.columnKey === 'age' ? sortInfo.order : null,
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
        filteredValue: filterInfo.addr,
        onFilter(v, record) {
          return record.address.includes(v);
        },
        sorter(a, b) {
          return a.address.length - b.address.length;
        },
        sortOrder: sortInfo.columnKey === 'addr' ? sortInfo.order : null,
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
        filterInfo: {},
        sortInfo: {
          columnKey: 'addr',
          order: 'ascend',
        },
      };
    },
    created() {
      this.columns = this.getCols();
      this.data = getData.call(this);
    },
    methods: {
      getCols,
      sortAge() {
        this.sortInfo = {
          columnKey: 'age',
          order: 'descend',
        };
        this.columns = this.getCols();
      },
      setNameFilter() {
        this.filterInfo = { name: ['John'] };
        this.columns = this.getCols();
      },
      clearSort() {
        this.sortInfo = {};
        this.columns = this.getCols();
      },
      clearFilter() {
        this.filterInfo = {};
        this.columns = this.getCols();
      },
      // 当设置了sortOrder或filteredValue时,需要与onChange配合使用,
      // 因为当组件内部更新filter或sort时,外部并不知晓内部变动,
      // 所以需要手工设置一下, 防止变动columns时,丢失内部变动的值
      onChange(_, filterInfo, sort) {
        console.log('sort', sort);
        this.filterInfo = filterInfo;
        this.sortInfo = sort;
        // this.columns = this.getCols();
      },
    },
  };
</script>
