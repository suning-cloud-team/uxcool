<template>
  <div class="demo">
    <h6>fixed header</h6>
    <p>表头和数据可能不对齐,请设置column的`width`属性</p>
    <ux-table :columns="columns"
              v-model="data"
              :scroll="{y:250}" />
  </div>
</template>

<script>
  import { Divider, Table as UxTable } from '@suning/uxcool';

  function getCols() {
    return [
      {
        key: 'name',
        width: '25%',
        title: 'Name',
        dataIndex: 'name',
        cellRender(text) {
          return <a href="#">{text}</a>;
        },
      },
      {
        key: 'age',
        width: 100,
        title: 'Age',
        dataIndex: 'age',
      },
      {
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
        age: 10 + i,
        address: `address address ${i}`,
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
    created() {
      this.columns = getCols.call(this);
      this.data = getData.call(this);
    },
  };
</script>
