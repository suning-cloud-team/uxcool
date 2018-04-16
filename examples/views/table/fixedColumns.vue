<template>
  <div class="demo">
    <h6>fixed columns</h6>
    <p>
      1. 表头和数据可能不对齐,请设置column的`width`属性,
      <br>
      <b>
        2. `fixed`列必须设置`width`属性,且不能使用百分比;
      </b>
      <br>
      <b>
        2. scroll.x 设置一个大于实际表格宽度的百分比或固定值,并且`fixed`列的总宽度不要超过表格宽度
      </b>
    </p>
    <ux-table :theme="theme"
              :columns="columns"
              v-model="data"
              :scroll="{x: '150%'}" />
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import { Divider, Table as UxTable } from '@suning/uxcool';

  function getCols() {
    return [
      {
        fixed: 'left',
        width: 150,
        key: 'name',
        title: 'Name',
        dataIndex: 'name',
        cellRender(text) {
          return <a href="#">{text}</a>;
        },
      },
      {
        fixed: 'left',
        width: 100,
        key: 'age',
        title: 'Age',
        dataIndex: 'age',
      },
      ...Array(10)
        .fill(0)
        .map((v, i) => ({
          key: `addr${i}`,
          title: `Addr${i}`,
          dataIndex: 'address',
        })),
      {
        fixed: 'right',
        width: 200,
        key: 'action',
        title: 'Action',
        cellRender() {
          return <a>Action</a>;
        },
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
    computed: mapState(['theme']),
    created() {
      this.columns = getCols.call(this);
      this.data = getData.call(this);
    },
  };
</script>
