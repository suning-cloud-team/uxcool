<template>
  <ux-demo title="可选择"
           vertical>
    <div slot="demo">
      <ux-table :columns="columns"
                v-model="data"
                :row-selection="rowSelection" />
    </div>
    <div slot="desc">
      第一列是联动的选择框。
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/table/selection.vue';

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
        code,
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
    computed: {
      theme() {
        return this.$store.state.theme;
      },
    },
    created() {
      this.columns = getCols.call(this);
      this.data = getData.call(this);
    },
  };
</script>

