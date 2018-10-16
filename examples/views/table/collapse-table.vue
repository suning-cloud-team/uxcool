<template>
  <div class="demo">
    <h6>collapse nest table</h6>
    <ux-collapse>
      <ux-collapse-panel name="1"
                         header="This is header panel 1">
        <ux-table ref="tableRef"
                  :theme="theme"
                  :columns="columns"
                  v-model="data"
                  :scroll="{x: '150%',y:250}" />
      </ux-collapse-panel>
    </ux-collapse>
    <!-- <button @click="onClick">显示/隐藏</button>
    <div :style="isHidden ?'display:none' : ''">
      <ux-table ref="tableRef"
                :theme="theme"
                :columns="columns"
                v-model="data"
                :scroll="{x: '150%'}" />

    </div> -->

  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import { Divider, Table as UxTable, Collapse } from '@suning/uxcool';

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
      UxDivider: Divider,
      UxCollapse: Collapse,
      UxCollapsePanel: Collapse.Panel,
    },
    data() {
      return {
        columns: [],
        data: [],
        isHidden: true,
      };
    },
    computed: mapState(['theme']),
    created() {
      this.columns = getCols.call(this);
      this.data = getData.call(this);
    },
    methods: {
      onClick() {
        this.isHidden = !this.isHidden;
      },
    },
  };
</script>
