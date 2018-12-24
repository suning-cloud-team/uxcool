<template>
  <div class="demo">
    <h6>manual resize</h6>
    <ux-table ref="tableRef"
              :columns="columns"
              v-model="data"
              :scroll="{x:'110%',y:250}" />
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import { Divider, Table as UxTable } from '@suning/uxcool';

  function getCols() {
    const that = this;
    const { moreData } = that;
    return [
      {
        fixed: 'left',
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
        width: 200,
        title: 'Addr',
        cellRender() {
          return that.isMore ? 'abc' : 'abc'.repeat(20);
        },
      },
      {
        fixed: 'right',
        width: 150,
        key: 'operator',
        title: 'Operator',
        cellRender() {
          return <span on-click={moreData}>action</span>;
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
        isMore: false,
      };
    },
    computed: mapState(['theme']),
    created() {
      this.columns = getCols.call(this);
      this.data = getData.call(this);
    },
    methods: {
      moreData() {
        this.isMore = !this.isMore;
        this.$refs.tableRef.alignRowHeight();
      },
    },
  };
</script>
