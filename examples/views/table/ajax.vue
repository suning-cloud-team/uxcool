<template>
  <div class="demo">
    <h6> ajax</h6>
    <p>请打开devtools,查看请求参数 </p>
    <ux-table :theme="theme"
              :columns="columns"
              v-model="data"
              :row-key="rowKey"
              :pagination="pagination"
              :loading="loading"
              @change="onChange" />
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import Axios from 'axios';
  import { Divider, Table as UxTable } from '@suning/uxcool';

  function getCols() {
    const { sortInfo, filterInfo } = this;
    return [
      {
        key: 'name',
        title: 'Name',
        dataIndex: 'name',
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
            text: 'John',
            value: 'John',
          },
        ],
        sorter: true,
        sortOrder: sortInfo.columnKey === 'name' ? sortInfo.order : null,
        filteredValue: filterInfo.name,
      },
      {
        key: 'age',
        title: 'Age',
        dataIndex: 'age',
        sorter: true,
      },
      {
        key: 'email',
        title: 'email',
        dataIndex: 'email',
        filters: [
          {
            text: 'London',
            value: 'London',
          },
          {
            text: 'New York',
            value: 'New York',
          },
        ],
        filteredValue: filterInfo.email,
      },
    ];
  }

  export default {
    components: {
      UxTable,
      Divider,
    },
    data() {
      return {
        loading: false,
        pagination: {
          current: 1,
          pageSize: 10,
          total: 0,
        },
        filterInfo: {
          name: ['John'],
          email: ['New York'],
        },
        sortInfo: {
          columnKey: 'name',
          field: 'name',
          order: 'descend',
        },
        columns: [],
        data: [],
      };
    },
    computed: mapState(['theme']),
    created() {
      const { current, pageSize } = this;
      this.queryData(current, pageSize);
      this.columns = this.getCols();
    },
    mounted() {},
    methods: {
      getCols,
      rowKey(record) {
        return `${record.name}-${record.age}`;
      },
      queryData(current, pageSize) {
        const { filterInfo, sortInfo: { field: sortField, order: sortOrder } } = this;
        const params = {
          current,
          pageSize,
          sortField,
          sortOrder,
          ...filterInfo,
        };
        this.loading = true;
        return Axios.get('http://dip.cnsuning.com:80/service/2698/1.0.0/table', { params }).then(({ data }) => {
          this.pagination.total = data.total;
          this.data = data.data;
          // effect
          setTimeout(() => {
            this.loading = false;
          }, 1500);
        });
      },
      onChange(pager, filterInfo, sort) {
        console.log('change', pager, filterInfo, sort);
        this.filterInfo = filterInfo;
        const { current, pageSize } = pager;
        this.sortInfo = sort;
        this.queryData(current, pageSize);
      },
    },
  };
</script>
