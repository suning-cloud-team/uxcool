<template>
  <div class="demo">
    <h6>selection</h6>
    <ux-table :theme="theme"
              :columns="columns"
              v-model="data"
              :row-selection="rowSelection" />
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
        cellRender(text) {
          return <a>{text}</a>;
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
        name: 'Disabled User',
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
        rowSelection: {
          selectedRowKeys: ['3'],
          onChange(selectedRowKeys, selectedRow, op, prevSelectRowKeys) {
            console.log('selectedRowKeys', selectedRowKeys, selectedRow, op, prevSelectRowKeys);
            this.selectedRowKeys = selectedRowKeys;
          },
          onSelect(...args) {
            console.log('onSelect', ...args);
          },
          getCheckboxProps(record) {
            return {
              disabled: record.name === 'Disabled User',
            };
          },
        },
      };
    },
    computed: mapState(['theme']),
    created() {
      this.columns = getCols.call(this);
      this.data = getData.call(this);
    },
  };
</script>
