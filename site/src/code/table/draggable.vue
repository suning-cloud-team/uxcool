<template>
  <ux-table :columns="columns"
            v-model="data"
            draggable
            @drop="onDrop" />
</template>

<script>
  function getCols() {
    return [
      {
        key: 'name',
        title: 'Name',
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
      },
    ];
  }

  function getData() {
    return Array.from({ length: 10 }, (_, i) => ({
      key: `key${i}`,
      name: `name ${i}`,
      age: Math.round(Math.random() * 30) + 10,
      address: `address ${i}`,
    }));
  }

  export default {
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
    methods: {
      onDrop(e) {
        // 通过getValue方法可以拿到拖拽后的数据, 由于表格组件会给数据添加一些额外字段，底层拖拽表格拿到的字段会比用户传入的多，用户在提交数据前需要自行处理额外字段, 后续版本会考虑优化
        const { getValue } = e;
        console.log('onDrag', e, getValue());
      },
    },
  };
</script>

