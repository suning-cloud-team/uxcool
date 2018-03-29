<template>

  <div class="demo">
    <ux-button @click="onClick">{{ fixed ? 'clear': 'set' }} fixed</ux-button>
    <ux-table :theme="theme"
              :scroll="{x:'130%', y: '200'}"
              :columns="cols1"
              v-model="data1"
              :expand-icon-col-index="1"
              :pagination="pagination"
              :row-selection="rowSelection"
              @change="onChange" />

  </div>
</template>


<script>
  import { mapState } from 'vuex';
  import Vue from 'vue';
  import Icon from '@suning/uxcool/src/components/icon';
  import { UxTable, Button } from '@suning/uxcool';
  import { getData as originGetData } from './data';

  Vue.component('AB', {
    render() {
      return <span style="color: red">{this.$slots.default}</span>;
    },
  });

  function genCols() {
    // eslint-disable-next-line
    const h = this.$createElement;
    return [
      {
        key: 1,
        fixed: this.fixed,
        title: 'key',
        dataIndex: 'key',
        width: 150,
        sorter(a, b) {
          return a - b;
        },
        filters: [
          {
            text: 1,
            value: 1,
          },
        ],
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
        filters: [
          {
            text: 'Joe',
            value: 'Joe',
          },
          {
            text: 'Jim',
            value: 'Jim',
          },
          {
            text: 'Submenu',
            value: 'Submenu',
            children: [
              {
                text: 'Green',
                value: 'Green',
              },
              {
                text: 'Black',
                value: 'Black',
              },
            ],
          },
        ],
        filterDropdownVisible: this.filterDropdownVisible,
        onFilter(v, record) {
          return v === 'Joe' && record.name.indexOf('12') > -1;
        },
      },
      {
        title: 'Age',
        dataIndex: 'age',
        filters: [
          {
            text: '<15',
            value: '15',
          },
          {
            text: '<20',
            value: '20',
          },
        ],
        filteredValue: ['15'],
        filterMultiple: false,
        onFilter(v, record) {
          return record.age < Number(v);
        },
      },
      {
        fixed: 'right',
        width: 200,
        title: 'Addr',
        dataIndex: 'addr',
        filters: [
          {
            text: 'a',
            value: 'a',
          },
        ],
        filterIcon: <Icon type="delivery" />,
      },
    ];
  }
  export default {
    components: {
      UxTable,
      UxButton: Button,
    },
    data() {
      return {
        fixed: true,
        filterDropdownVisible: true,
        cols1: [],
        data1: this.getData(12),
        pagination: {
          position: 'both',
        },
        rowSelection: {
          selections: true,
          selectedRowKeys: [],
          onChange(...args) {
            console.log('row onChange', ...args);
          },
        },
      };
    },
    computed: mapState(['theme']),
    created() {
      this.cols1 = genCols.call(this);
      setTimeout(() => {
        this.data1 = this.getData(5);
        this.pagination = false;
        setTimeout(() => {
          this.data1 = this.getData(13, 'ee');
          this.pagination = {
            onChange(...args) {
              console.log('pagination change', args);
            },
          };
        }, 1500);
        this.filterDropdownVisible = false;
        // this.cols1[1].filterDropdownVisible = this.filterDropdownVisible;
        // this.cols1 = genCols.call(this);
      }, 3500);
    },
    methods: {
      getData: originGetData,
      onChange(...args) {
        console.log('table change', args);
      },
      onClick() {
        this.fixed = !this.fixed;
        this.cols1 = genCols.call(this);
      },
    },
  };
</script>
