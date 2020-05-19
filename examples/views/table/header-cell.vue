<template>
  <div class="demo">
    <h6>header-cell</h6>
    <ux-table :theme="theme"
              :columns="columns"
              v-model="data" />
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import { Divider, Table as UxTable } from '@cloud-sn/uxcool';

  function getCols() {
    const that = this;
    return [
      {
        key: 'name',
        title: 'Name',
        align: 'center',
        dataIndex: 'name',
        cellRender(text) {
          return <a href="#">{text}</a>;
        },
      },
      {
        key: 'age',
        title: 'Age',
        dataIndex: 'age',
      },
      {
        key: 'addr',
        title: 'Addr',
        dataIndex: 'address',
        onHeaderCell: () => {
          // eslint-disable-next-line
          const h = that.$createElement;
          return {
            title: <div style="color:red">abc</div>,
          };
        },
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
          // return (
          //   <span>
          //     <a href="#">Action-{record.name}</a>
          //     <Divider type="vertical" />
          //     <a href="#">Delete</a>
          //   </span>
          // );
        },
      },
    ];
  }

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
      Divider,
    },
    data() {
      return {
        columns: [],
        data: [],
      };
    },
    computed: mapState(['theme']),
    created() {
      this.columns = getCols.call(this);
      this.data = getData.call(this);
    },
  };
</script>
