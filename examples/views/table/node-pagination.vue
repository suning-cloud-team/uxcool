<template>

  <div class="demo">
    <ux-table :columns="node.columns"
              v-model="node.data"
              :pagination="node.pagination"
              @change="onChange" />
    <ux-button @click="go">addPagination</ux-button>
  </div>
</template>


<script>
  import { UxTable, Button } from '@cloud-sn/uxcool';
  import { getData } from './data';

  const columns = [
    {
      title: 'key',
      dataIndex: 'key',
      filters: [
        {
          text: 1,
          value: 1,
        },
      ],
      onFilter(v, record) {
        return String(record.key) === String(v);
      },
    },
    {
      fixed: false,
      width: 200,
      title: 'Name',
      dataIndex: 'name',
      filters: [
        {
          text: 'sss1',
          value: 'sss1',
        },
      ],
      onFilter(v, record) {
        return record.name === v;
      },
    },
    {
      title: 'Age',
      dataIndex: 'age',
    },
    {
      title: 'Addr',
      dataIndex: 'addr',
    },
  ];

  export default {
    components: {
      UxTable,
      UxButton: Button,
    },
    data() {
      return {
        node: {
          columns,
          data: getData.call(this, 12),
          pagination: {
            current: 1,
            pageSize: 10,
            total: 100,
          },
        },
      };
    },
    methods: {
      onChange(...args) {
        console.log('table change', args);
      },
      go() {
        this.node.pagination.current += 1;
      },
    },
  };
</script>
