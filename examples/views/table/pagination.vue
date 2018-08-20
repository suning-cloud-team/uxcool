<template>

  <div class="demo">
    <h4>pagination</h4>
    <ux-table :theme="theme"
              :columns="cols1"
              v-model="data1"
              :pagination="pagination"
              :row-selection="rowSelection"
              @change="onChange" />

  </div>
</template>


<script>
  import { mapState } from 'vuex';
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
        data1: [],
        pagination: {},
        rowSelection: {
          selectedRowKeys: [],
          onChange(...args) {
            console.log('row onChange', ...args);
          },
        },
      };
    },
    computed: mapState(['theme']),
    created() {
      this.data1 = getData.call(this, 5000);
    },
    // created() {
    //   setTimeout(() => {
    //     this.data1 = getData(5);
    //     this.pagination = false;
    //     setTimeout(() => {
    //       this.data1 = getData(13, 'ee');
    //       this.pagination = {
    //         onChange(...args) {
    //           console.log('pagination change', args);
    //         },
    //       };
    //       this.rowSelection.selectedRowKeys = [];
    //     }, 1500);
    //   }, 3500);
    // },
    methods: {
      onChange(...args) {
        console.log('table change', args);
      },
    },
  };
</script>
