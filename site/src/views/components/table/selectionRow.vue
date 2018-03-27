<template>
  <ux-demo title="点击行选择"
           vertical>
    <div slot="demo">
      <ux-table :columns="columns"
                v-model="data"
                :row-selection="rowSelection"
                :on-row="onRow" />
    </div>
    <div slot="desc">
      点击当前行,选中selection
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/table/selectionRow.vue';

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
      const that = this;
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
          getCheckboxProps(record) {
            return {
              disabled: record.name === 'Disabled User',
            };
          },
        },
        onRow(record) {
          return {
            on: {
              click() {
                const { rowSelection: { selectedRowKeys } } = that;
                const { key } = record;
                const idx = selectedRowKeys.indexOf(key);
                if (idx === -1) {
                  selectedRowKeys.push(key);
                } else {
                  selectedRowKeys.splice(idx, 1);
                }
              },
            },
          };
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
