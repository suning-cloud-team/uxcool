<template>
  <ux-demo title="固定列"
           vertical>
    <div slot="demo">
      <ux-table :columns="columns"
                v-model="data"
                :scroll="{x: '150%'}" />
    </div>
    <div slot="desc">
      <p>
        表头和数据可能不对齐,请设置column的
        <code>width</code>属性;
        <br>
        <code>fixed</code>列必须设置
        <code>width</code>属性,且不能使用百分比;
        <br>
        <code>scroll.x </code>设置一个大于实际表格宽度的百分比或固定值,并且
        <code>fixed</code>列的总宽度不要超过表格宽度;
      </p>
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/table/fixedColumns.vue';

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
    data() {
      return {
        code,
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
      this.columns = getCols.call(this);
      this.data = getData.call(this);
    },
  };
</script>

