<template>
  <ux-demo title="大小"
           vertical>
    <div slot="demo">
      <h6>middle</h6>
      <ux-table :columns="columns"
                v-model="data"
                size="middle" />
      <h6>small</h6>
      <ux-table :columns="columns"
                v-model="data"
                size="small" />
    </div>
    <div slot="desc">
      两种紧凑型的列表，小型列表只用于对话框内。
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/table/size.vue';

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

