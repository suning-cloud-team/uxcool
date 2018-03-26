<template>
  <div slot="demo">
    <ux-table :columns="columns"
              v-model="data"
              :pagination="pagination"
              :scroll="{x: '150%', y:250}" />
  </div>
</template>
<script>
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
        columns: [],
        data: [],
        pagination: true,
      };
    },
    created() {
      this.columns = getCols.call(this);
      this.data = getData.call(this, 100);
    },
  };
</script>
