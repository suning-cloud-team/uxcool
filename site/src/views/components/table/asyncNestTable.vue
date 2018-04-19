<template>
  <ux-demo title="异步加载内嵌表格"
           :height="200"
           vertical>
    <div slot="demo">
      <ux-table class="components-table-demo-nested"
                :theme="theme"
                :columns="columns"
                v-model="data"
                :expanded-row-render="expandedRowRender"
                @expand="onExpand" />
    </div>
    <div slot="desc">
      点击expandIcon后异步加载内嵌表格数据
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/table/asyncNestTable.vue';

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
              <ux-divider type="vertical" />
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
              <ux-badge status="success" />Finished
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
              <ux-tooltip content="Fake Pause">
                <a>Pause</a>
              </ux-tooltip>
              <ux-divider type="vertical" />
              <ux-tooltip content="Fake Stop">
                <a>Stop</a>
              </ux-tooltip>
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
        loading: false,
        nest: {
          columns: getNestCols(),
          datas: [],
        },
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
      this.data = getData.call(this, 5);
    },

    methods: {
      expandedRowRender(record) {
        const { nest: { columns, datas }, loading } = record;
        return <ux-table columns={columns} value={datas} loading={loading} />;
      },
      onExpand(isExpand, record) {
        const { data } = this;
        if (isExpand) {
          const item = data.filter(v => v.key === record.key)[0];
          if (item) {
            item.loading = true;
            setTimeout(() => {
              item.nest.datas = getNestData(4);
              item.loading = false;
            }, 1500);
          }
        }
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
