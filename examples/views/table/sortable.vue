<template>

  <div class="demo">
    <ux-table :columns="cols1"
              v-model="data1"
              :pagination="pagination"
              :row-selection="rowSelection"
              @change="onChange" />

  </div>
</template>


<script>
  import '@suning/uxcool/src/components/table/style/index.scss';
  import UxTable from '@suning/uxcool/src/components/table';
  import { getData } from './data';

  export default {
    components: {
      UxTable,
    },
    data() {
      return {
        cols1: [
          {
            title: 'key',
            dataIndex: 'key',
          },
          {
            fixed: false,
            width: 200,
            title: 'Name',
            dataIndex: 'name',
            sorter(a, b) {
              return a.name - b.name;
            },
            sortOrder: 'descend',
          },
          {
            title: 'Age',
            dataIndex: 'age',
          },
          {
            title: 'Addr',
            dataIndex: 'addr',
          },
        ],
        data1: getData(12),
        pagination: {},
        rowSelection: {
          selectedRowKeys: [],
          onChange(...args) {
            console.log('row onChange', ...args);
          },
        },
      };
    },
    created() {
      setTimeout(() => {
        this.data1 = getData(5);
        this.pagination = false;
        setTimeout(() => {
          this.data1 = getData(13, 'ee');
          this.pagination = {
            onChange(...args) {
              console.log('pagination change', args);
            },
          };
          this.rowSelection.selectedRowKeys = [];
        }, 1500);
      }, 3500);
    },
    methods: {
      onChange(...args) {
        console.log('table change', args);
      },
    },
  };
</script>
