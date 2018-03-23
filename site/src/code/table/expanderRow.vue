<template>
  <div>
    <ux-table :columns="columns"
              v-model="data"
              :expanded-row-render="expandedRowRender" />
  </div>
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
      {
        title: 'Action',
        cellRender(_, record) {
          return (
            <span>
              <a href="#">Action-{record.name}</a>
              <ux-divider type="vertical" />
              <a href="#">Delete</a>
            </span>
          );
        },
      },
    ];
  }

  function getData() {
    return [
      {
        key: 1,
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
      },
      {
        key: 2,
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
      },
      {
        key: 3,
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
      },
    ];
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
      expandedRowRender(record) {
        return <p>{record.description}</p>;
      },
    },
  };
</script>

<style scoped>
  .ux-table-expanded-row p {
    margin-bottom: 0;
  }
</style>
