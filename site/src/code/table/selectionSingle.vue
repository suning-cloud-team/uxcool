<template>
  <div>
    <ux-table :columns="columns"
              v-model="data"
              :row-selection="rowSelection" />
  </div>
</template>

<script>
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
    data() {
      return {
        columns: [],
        data: [],
        rowSelection: {
          selectedRowKeys: ['3'],
          type: 'radio',
          columnWidth: 0,
          onChange(selectedRowKeys, selectedRow, op, prevSelectRowKeys) {
            console.log('selectedRowKeys', selectedRowKeys, selectedRow, op, prevSelectRowKeys);
            this.selectedRowKeys = selectedRowKeys;
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

