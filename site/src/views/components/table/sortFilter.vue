<template>
  <ux-demo title="筛选和排序"
           vertical>
    <div slot="demo">
      <ux-table :theme="theme"
                :columns="columns"
                v-model="data" />
    </div>
    <div slot="desc">
      对某一列数据进行筛选，使用列的
      <code>filters</code> 属性来指定需要筛选菜单的列，
      <code>onFilter</code> 用于筛选当前数据，
      <code>filterMultiple</code> 用于指定多选和单选。
      <br> 对某一列数据进行排序，通过指定列的
      <code>sorter</code> 函数即可启动排序按钮。
      <code>sorter: function(a, b) { ... }</code> ， a、b 为比较的两个列数据。
      <br> 使用
      <code>defaultSortOrder</code> 属性，设置列的默认排序顺序
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/table/sortFilter.vue';

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
    data() {
      return {
        code,
        columns: [],
        data: [],
      };
    },
    computed: {
      theme() {
        return this.$store.state.theme;
      },
    },
    created() {
      this.columns = this.getCols();
      this.data = getData.call(this);
    },
    methods: {
      getCols,
    },
  };
</script>
