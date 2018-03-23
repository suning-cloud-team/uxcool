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
      const that = this;
      return {
        columns: [],
        data: [],
        rowSelection: {
          selectedRowKeys: [],
          selections: [
            {
              key: 'allData',
              text: 'Select All Data',
              onSelect() {
                const { rowSelection, data } = that;
                rowSelection.selectedRowKeys = data.map(v => v.key);
              },
            },
            {
              key: 'odd',
              text: 'Select Odd Data',
              onSelect(changeableRowKeys) {
                const { rowSelection } = that;
                rowSelection.selectedRowKeys = changeableRowKeys.filter((v, i) => i % 2 !== 0);
              },
            },
            {
              key: 'even',
              text: 'Select Even Data',
              onSelect(changeableRowKeys) {
                const { rowSelection } = that;
                rowSelection.selectedRowKeys = changeableRowKeys.filter((v, i) => i % 2 === 0);
              },
            },
          ],
          onChange(selectedRowKeys, selectedRow, op, prevSelectRowKeys) {
            console.log('selectedRowKeys', selectedRowKeys, selectedRow, op, prevSelectRowKeys);
            this.selectedRowKeys = selectedRowKeys;
          },
        },
      };
    },
    created() {
      this.columns = getCols.call(this);
      this.data = getData.call(this, 15);
    },
  };
</script>

