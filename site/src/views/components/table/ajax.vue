<template>
  <ux-demo :height="200"
           title="ajax"
           vertical>
    <div slot="demo">
      <ux-table :theme="theme"
                :columns="columns"
                v-model="data"
                :row-key="rowKey"
                :pagination="pagination"
                :loading="loading"
                @change="onChange" />
    </div>
    <div slot="desc">
      <p>请打开devtools,查看请求参数 </p>
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/table/ajax.vue';
  import Axios from 'axios';

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
    data() {
      return {
        code,
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

    computed: {
      theme() {
        return this.$store.state.theme;
      },
    },
    created() {
      this.queryData();
      this.columns = this.getCols();
    },
    methods: {
      getCols,
      rowKey(record) {
        return `${record.name}-${record.age}`;
      },
      queryData() {
        const {
          filterInfo,
          sortInfo: { field: sortField, order: sortOrder },
          pagination,
        } = this;
        const { current, pageSize } = pagination;
        const params = {
          current,
          pageSize,
          sortField,
          sortOrder,
          ...filterInfo,
        };
        this.loading = true;
        return Axios.get('http://dip.cnsuning.com/service/1554195600131/1.0/table', { params }).then(({ data: { data } }) => {
          // effect
          setTimeout(() => {
            this.pagination = { ...pagination, total: data.total };
            this.data = data.data;
            this.loading = false;
          }, 1500);
        });
      },
      onChange(pager, filterInfo, sort) {
        console.log('change', pager, filterInfo, sort);
        this.filterInfo = filterInfo;
        this.pagination = pager;
        this.sortInfo = sort;
        this.queryData();
      },
    },
  };
</script>
