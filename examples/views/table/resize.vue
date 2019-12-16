<template>
  <div class="demo">
    <h6>resizable</h6>
    <ux-table v-model="data"
              :theme="theme"
              :columns="col1"
              bordered
              @column-width-resize="onResize" />
    <ux-table v-model="data"
              :theme="theme"
              :columns="col2"
              bordered
              @column-width-resize="onResize" />
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import { Table as UxTable } from '@suning/uxcool';

  function getData() {
    return [
      {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
      },
      {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
      },
      {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
      },
    ];
  }

  export default {
    components: {
      UxTable,
    },
    data() {
      return {
        data: [],
        col1: [],
        col2: [],
      };
    },
    computed: mapState(['theme']),
    created() {
      this.data = getData.call(this);
      this.col1 = [
        {
          key: 'name',
          title: 'Name',
          align: 'center',
          dataIndex: 'name',
          width: 200,
          resizable: true,
          cellRender(text) {
            return <a href="#">{text}</a>;
          },
        },
        {
          key: 'age',
          title: 'Age',
          dataIndex: 'age',
          resizable: true,
          width: 100,
        },
        {
          key: 'addr',
          title: 'Addr',
          dataIndex: 'address',
        },
        {
          title: 'Action',
          cellRender(_, record) {
            const h = this.$createElement;
            return h('span', [
              h(
                'a',
                {
                  attrs: {
                    href: '#',
                  },
                },
                [`Action-${record.name}`]
              ),
            ]);
          },
        },
      ];
      this.col2 = [
        {
          key: 'name',
          title: 'Name',
          align: 'center',
          dataIndex: 'name',
          fixed: 'left',
          width: 200,
          resizable: true,
          cellRender(text) {
            return <a href="#">{text}</a>;
          },
        },
        {
          // key: 'age',
          title: 'Age',
          dataIndex: 'age',
          resizable: true,
          width: 100,
          cellRender() {
            return 'text';
          },
        },
        {
          title: 'Action',
          width: 200,
          resizable: true,
          cellRender(_, record) {
            const h = this.$createElement;
            return h('span', [
              h(
                'a',
                {
                  attrs: {
                    href: '#',
                  },
                },
                [`Action-${record.name}`]
              ),
            ]);
          },
        },
        {
          key: 'addr',
          title: 'Addr',
          dataIndex: 'address',
        },
      ];
    },
    methods: {
      onResize(...args) {
        console.log('onResize', ...args);
      },
    },
  };
</script>
