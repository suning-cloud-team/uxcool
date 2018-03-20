<template>

  <div class="demo">
    <ux-table :columns="cols1"
              v-model="data1"
              :expand-icon-col-index="1"
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
            key: 1,
            title: 'key',
            dataIndex: 'key',
            width: 150,
          },
          {
            fixed: false,
            width: 200,
            title: 'Name',
            dataIndex: 'name',
            sorter(a, b) {
              const m1 = a.name.match(/\d+/);
              const m2 = b.name.match(/\d+/);
              return parseInt(m1[0], 10) - parseInt(m2[0], 10);
            },
            // sorter(a, b) {
            //   let r = 0;
            //   if (a.name > b.name) {
            //     r = -1;
            //   } else if (a.name < b.name) {
            //     r = 1;
            //   }
            //   return r;
            // },
          },
          {
            title: 'Age',
            dataIndex: 'age',
            sorter(a, b) {
              return a.age - b.age;
            },
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
