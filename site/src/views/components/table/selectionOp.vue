<template>
  <ux-demo title="选择与操作"
           :height="200"
           vertical>
    <div slot="demo"
         class="gutter-group">
      <ux-button :loading="loading"
                 @click="reload()">reload</ux-button>
      <ux-table :theme="theme"
                :columns="columns"
                v-model="data"
                :row-selection="rowSelection" />
    </div>
    <div slot="desc">
      选择后进行操作，完成后清空选择，通过
      <code>rowSelection.selectedRowKeys</code> 来控制选中项。
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>


<script>
  import code from '@/code/table/selectionOp.vue';

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
        code,
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
    computed: {
      theme() {
        return this.$store.state.theme;
      },
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

