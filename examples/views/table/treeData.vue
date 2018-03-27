<template>
  <div class="demo">
    <h6>tree data</h6>
    <p>未实现 父子级间 selection关联选中</p>
    <ux-table :columns="columns"
              v-model="data"
              :row-selection="rowSelection" />
  </div>
</template>

<script>
  import { Divider, Table as UxTable } from '@suning/uxcool';

  function getCols() {
    return [
      {
        key: 'name',
        title: 'Name',
        dataIndex: 'name',
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
        key: 1,
        name: 'John Brown sr.',
        age: 60,
        address: 'New York No. 1 Lake Park',
        children: [
          {
            key: 11,
            name: 'John Brown',
            age: 42,
            address: 'New York No. 2 Lake Park',
          },
          {
            key: 12,
            name: 'John Brown jr.',
            age: 30,
            address: 'New York No. 3 Lake Park',
            children: [
              {
                key: 121,
                name: 'Jimmy Brown',
                age: 16,
                address: 'New York No. 3 Lake Park',
              },
            ],
          },
          {
            key: 13,
            name: 'Jim Green sr.',
            age: 72,
            address: 'London No. 1 Lake Park',
            children: [
              {
                key: 131,
                name: 'Jim Green',
                age: 42,
                address: 'London No. 2 Lake Park',
                children: [
                  {
                    key: 1311,
                    name: 'Jim Green jr.',
                    age: 25,
                    address: 'London No. 3 Lake Park',
                  },
                  {
                    key: 1312,
                    name: 'Jimmy Green sr.',
                    age: 18,
                    address: 'London No. 4 Lake Park',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        key: 2,
        name: 'Joe Black',
        age: 32,
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
    created() {
      this.columns = getCols.call(this);
      this.data = getData.call(this);
    },
  };
</script>
