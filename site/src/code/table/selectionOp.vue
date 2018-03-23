<template>
  <div>
    <ux-button :loading="loading"
               @click="reload()">reload</ux-button>
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

  function getData(cnt = 10) {
    return Array(cnt)
      .fill(0)
      .map((v, i) => ({
        key: i,
        name: `a${i}`,
        age: 10 + i,
        address: `address address ${i}`,
      }));
  }
  export default {
    data() {
      return {
        loading: false,
        columns: [],
        data: [],
        rowSelection: {
          selectedRowKeys: ['3'],
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
    methods: {
      reload() {
        this.loading = true;
        setTimeout(() => {
          this.rowSelection.selectedRowKeys = [];
          this.loading = false;
        }, 2500);
      },
    },
  };
</script>

