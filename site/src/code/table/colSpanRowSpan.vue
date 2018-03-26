<template>
  <div>
    <ux-table :columns="columns"
              v-model="data"
              bordered/>
  </div>
</template>

<script>
  function onCell(_, rowIdx) {
    return rowIdx === 4 ? { colspan: 0 } : null;
  }
  function getCols() {
    return [
      {
        title: 'Name',
        dataIndex: 'name',
        onCell(record, rowIdx) {
          const r = {};
          if (rowIdx === 1) {
            r.colspan = 2;
          } else if (rowIdx === 4) {
            r.colspan = 5;
          }
          return r;
        },
      },
      {
        title: 'Age',
        dataIndex: 'age',
        onCell(_, rowIdx) {
          const r = {};
          if (rowIdx === 1 || rowIdx === 4) {
            r.colspan = 0;
          }
          return r;
        },
      },
      {
        title: 'Home phone',
        colspan: 2,
        dataIndex: 'tel',
        onCell(record, rowIdx) {
          const r = {};
          if (rowIdx === 2) {
            r.rowspan = 2;
          } else if (rowIdx === 3) {
            r.rowspan = 0;
          } else if (rowIdx === 4) {
            r.colspan = 0;
          }
          return r;
        },
      },
      {
        title: 'Phone',
        colspan: 0,
        dataIndex: 'phone',
        onCell,
      },
      {
        title: 'Address',
        dataIndex: 'address',
        onCell(_, rowIdx) {
          return rowIdx > 0 ? { rowspan: 0 } : { rowspan: 4 };
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
        tel: '0571-22098909',
        phone: 18889898989,
        address: 'New York No. 1 Lake Park',
      },
      {
        key: '2',
        name: 'Jim Green',
        tel: '0571-22098333',
        phone: 18889898888,
        age: 42,
        address: 'London No. 1 Lake Park',
      },
      {
        key: '3',
        name: 'Joe Black',
        age: 32,
        tel: '0575-22098909',
        phone: 18900010002,
        address: 'Sidney No. 1 Lake Park',
      },
      {
        key: '4',
        name: 'Jim Red',
        age: 18,
        tel: '0575-22098909',
        phone: 18900010002,
        address: 'London No. 2 Lake Park',
      },
      {
        key: '5',
        name: 'Jake White',
        age: 18,
        tel: '0575-22098909',
        phone: 18900010002,
        address: 'Dublin No. 2 Lake Park',
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
  };
</script>
