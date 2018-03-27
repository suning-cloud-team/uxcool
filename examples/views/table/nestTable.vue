<template>
  <div class="demo">
    <h6>expander row</h6>
    <ux-table class="components-table-demo-nested"
              :columns="columns"
              v-model="data"
              :expanded-row-render="expandedRowRender" />
  </div>
</template>

<script>
  import { Divider, Table as UxTable, Badge, Tooltip } from '@suning/uxcool';

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
              <a>Action-{record.name}</a>
              <Divider type="vertical" />
              <a>Delete</a>
            </span>
          );
        },
      },
    ];
  }

  function getNestCols() {
    return [
      { title: 'Date', dataIndex: 'date', key: 'date' },
      { title: 'Name', dataIndex: 'name', key: 'name' },
      {
        title: 'Status',
        key: 'state',
        cellRender() {
          return (
            <span>
              <Badge status="success" />Finished
            </span>
          );
        },
      },
      { title: 'Upgrade Status', dataIndex: 'upgradeNum', key: 'upgradeNum' },
      {
        title: 'Action',
        dataIndex: 'operation',
        key: 'operation',
        cellRender() {
          return (
            <span className="table-operation">
              <Tooltip content="Fake Pause">
                <a>Pause</a>
              </Tooltip>
              <Divider type="vertical" />
              <Tooltip content="Fake Stop">
                <a>Stop</a>
              </Tooltip>
            </span>
          );
        },
      },
    ];
  }

  function getNestData(cnt = 10) {
    return Array(cnt)
      .fill(0)
      .map((v, i) => ({
        key: i,
        date: '2014-12-24 23:12:00',
        name: 'This is production name',
        upgradeNum: `Upgraded: 56 ,, ${i}`,
      }));
  }

  function getData(cnt = 10) {
    return Array(cnt)
      .fill(0)
      .map((v, i) => ({
        key: i,
        name: `a${i}`,
        age: 10 + i,
        address: `address address ${i}`,
        nest: {
          columns: getNestCols(),
          datas: getNestData(3),
        },
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
      this.data = getData.call(this, 5);
    },
    methods: {
      expandedRowRender(record) {
        const { nest: { columns, datas } } = record;
        return <UxTable columns={columns} value={datas} />;
      },
    },
  };
</script>
<style>
  .components-table-demo-nested .ux-table-expanded-row > td:last-child {
    padding: 0 48px 0 8px;
  }

  .components-table-demo-nested .ux-table-expanded-row > td:last-child .ux-table-thead th {
    border-bottom: 1px solid #e9e9e9;
  }

  .components-table-demo-nested
    .ux-table-expanded-row
    > td:last-child
    .ux-table-thead
    th:first-child {
    padding-left: 0;
  }

  .components-table-demo-nested .ux-table-expanded-row > td:last-child .ux-table-row td:first-child {
    padding-left: 0;
  }

  .components-table-demo-nested .ux-table-expanded-row .ux-table-row:last-child td {
    border: none;
  }

  .components-table-demo-nested .ux-table-expanded-row .ux-table-thead > tr > th {
    background: none;
  }

  .components-table-demo-nested .table-operation a:not(:last-child) {
    margin-right: 24px;
  }

  .components-table-demo-nested .ux-table-expanded-row:hover > td {
    background: #fbfbfb;
  }
</style>
