<template>
  <!-- <ux-table :columns="cols1"
                footer="cccc">
        <span slot="title"
              slot-scope="props">
          abc
        </span>
        <span slot="footer">
          footer 11
        </span>
      </ux-table>   -->
  <div>
    <normal-demo/>
    <!-- <filter-demo /> -->
    <!-- <sortable-demo /> -->
    <!-- <pagination-demo /> -->

    <!-- {{data1}} -->
    <!-- <ux-table :columns="cols1"
                v-model="data1"
                expand-icon-col-index="-1" /> -->
    <!-- <div class="demo">
      <ux-table ref="t1"
                :scroll="{x:'130%'}"
                :columns="cols1"
                :row-selection="rowSelection"
                v-model="data1" />

    </div> -->

  </div>
</template>


<script>
  import '@suning/uxcool/src/components/table/style/index.scss';
  import UxTable from '@suning/uxcool/src/components/table';
  import { getData as originGetData } from './data';
  import NormalDemo from './normal.vue';
  import PaginationDemo from './pagination.vue';
  import SortableDemo from './sortable.vue';
  import FilterDemo from './filter.vue';

  export default {
    components: {
      UxTable,
      NormalDemo,
      PaginationDemo,
      SortableDemo,
      FilterDemo,
    },
    data() {
      return {
        cols1: [
          {
            title: 'key',
            dataIndex: 'key',
          },
          {
            fixed: true,
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
        data1: this.getData(12),
        data2: this.getData(1),
        rowSelection: {
          selectedRowKeys: ['c0', 23],
          // type: 'radio',
          getCheckboxProps() {
            return {
              defaultChecked: true,
              disabled: true,
            };
          },
          onChange(...args) {
            console.log('onChange', args);
          },
          onSelect(...args) {
            console.log('onSelect', args);
          },
          onSelectAll(...args) {
            console.log('onSelectAll', args);
          },
          onSelectInvert(...args) {
            console.log('onSelectInvert', args);
          },
        },
      };
    },
    mounted() {
      setTimeout(() => {
        // this.$set(this.rowSelection, 'getCheckboxProps', item => ({
        //   defaultChecked: item.key === 3,
        //   disabled: item.key % 2 === 0,
        // }));
        // this.rowSelection = {
        //   getCheckboxProps(item) {
        //     return {
        //       defaultChecked: item.key === 3,
        //       disabled: item.key % 2 === 0,
        //     };
        //   },
        // };
        this.rowSelection.getCheckboxProps = item => ({
          defaultChecked: item.key === 0,
          disabled: item.key % 2 === 0,
        });
        // this.rowSelection.type = 'checkbox';
        this.rowSelection.selectedRowKeys = ['2'];
        // this.cols1[0].fixed = true;
      }, 2500);

      console.log('refs', this.$refs.t1);
    },
    methods: {
      getData: originGetData,
    },
  };
</script>
