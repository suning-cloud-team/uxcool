<template>
  <ux-demo title="自定义选择项"
           vertical>
    <div slot="demo">
      <ux-table :columns="columns"
                v-model="data"
                :row-selection="rowSelection" />
    </div>
    <div slot="desc">
      通过
      <code>rowSelection.selections</code>自定义选择项，默认不显示下拉选项，设为
      <code>true</code> 时显示默认选择项
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/table/selectionCustom.vue';

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
        code,
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
    computed: {
      theme() {
        return this.$store.state.theme;
      },
    },
    created() {
      this.columns = getCols.call(this);
      this.data = getData.call(this, 15);
    },
  };
</script>

