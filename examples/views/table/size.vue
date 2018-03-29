<template>
  <div class="demo">
    <h4>size</h4>
    <h6>middle</h6>
    <ux-table :theme="theme"
              :columns="columns"
              v-model="data"
              size="middle" />
    <h6>small</h6>
    <ux-table :theme="theme"
              :columns="columns"
              v-model="data"
              size="small" />
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import { Divider, Table as UxTable } from '@suning/uxcool';

  function getCols() {
    return [
      {
        fixed: 'left',
        width: 200,
        key: 'name',
        title: 'Name',
        dataIndex: 'name',
        cellRender(text) {
          return <a>{text}</a>;
        },
      },
      {
        fixed: true,
        width: 200,
        key: 'age',
        title: 'Age',
        dataIndex: 'age',
      },
      {
        key: 'sex',
        title: 'Sex',
        dataIndex: 'sex',
      },
      {
        fixed: 'right',
        width: 80,
        key: 'addr',
        title: 'Addr',
        dataIndex: 'address',
      },
    ];
  }

  function getData(cnt = 10) {
    return Array(cnt)
      .fill(0)
      .map((v, i) => ({
        key: i,
        name: `a${i}`,
        sex: 'male',
        age: 10 + i,
        address: 'address ',
      }));
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
