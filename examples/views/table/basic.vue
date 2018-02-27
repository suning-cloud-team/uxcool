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
    <div class="demo">
      <ux-table ref="t1"
                :scroll="{x:'130%'}"
                :columns="cols1"
                :row-selection="rowSelection"
                v-model="data1" />

    </div>
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
        data1: getData(12),
        rowSelection: {
          getCheckboxProps() {
            return {
              defaultChecked: true,
              disabled: true,
            };
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
          defaultChecked: item.key === 3,
          disabled: item.key % 2 === 0,
        });
        this.cols1[0].fixed = true;
      }, 2500);

      console.log('refs', this.$refs.t1);
    },
  };
</script>
