<template>
  <div class="demo">
    <h6>draggable</h6>
    <ux-table :theme="theme"
              :columns="columns"
              :allow-drag="allowDrag"
              :allow-drop="allowDrop"
              v-model="data"
              draggable
              @drop="onDrop" />
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import { Divider, Table as UxTable } from '@cloud-sn/uxcool';

  function getCols() {
    return [
      {
        key: 'name',
        title: 'Name',
        dataIndex: 'name',
        fixed: 'left',
        width: 300,
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
  }

  function getData() {
    return [
      {
        key: '1',
        name: 'John',
        age: 32,
        address: 'New York',
        allowDrag: false,
      },
      {
        key: '2',
        name: 'Jim',
        age: 42,
        address: 'London',
      },
      {
        key: '3',
        name: 'Joe',
        age: 32,
        address: 'Sidney',
        allowDrop: false,
      },
      {
        key: '4',
        name: 'Jack',
        age: 30,
        address: 'ShangHai',
      },
      {
        key: '5',
        name: 'Mike',
        age: 30,
        address: 'NanJing',
      },
      {
        key: '6',
        name: 'Tony',
        age: 30,
        address: 'BeiJing',
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
    methods: {
      onDrop(...args) {
        console.log('onDrop', ...args);
      },
      allowDrag(record) {
        return record.allowDrag !== false;
      },
      allowDrop(record, dragRecord, dragPosition, isExpanded) {
        console.log('allowDrop', record, dragRecord, dragPosition, isExpanded);
        return record.allowDrop !== false;
      },
    },
  };
</script>
