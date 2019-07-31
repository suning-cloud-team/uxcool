<template>
  <ux-demo :height="200"
           title="大数据量"
           vertical>
    <div slot="demo">
      <ux-table :columns="columns"
                v-model="data"
                :virtual-scroll="{itemSize: 40, maxHeight: 400}" />
    </div>
    <div slot="desc">
      通过<code>virtual-scroll</code>属性配置虚拟滚动，可以支持大数据量表格渲染。(目前树形表格上下关联选择还未优化，数据量很大时复选框勾选还是有点卡顿)
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/table/virtual.vue';
  import { TreeHandler } from '@suning/v-utils';

  function getCols() {
    const { onCheckboxChange } = this;
    return [
      {
        width: 200,
        key: 'name',
        title: 'Name',
        dataIndex: 'name',
        cellRender(text, record) {
          return (
            <span>
              <ux-checkbox
                control={true}
                checked={record.isChecked}
                indeterminate={record.isHalfChecked}
                onInput={checked => onCheckboxChange(checked, record)}
              />
              <span style="margin-left:5px">{text}</span>
            </span>
          );
        },
      },
      {
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
        width: 200,
        key: 'addr',
        title: 'Addr',
        dataIndex: 'address',
      },
    ];
  }

  function getData(cnt = 1000) {
    return Array(cnt)
      .fill(0)
      .map((v, i) => ({
        key: i,
        name: `a${i}`,
        sex: `${i} male`,
        age: 10 + i,
        address: `address ${i}`,
        children: Array.from({ length: 5 }, (_, idx) => ({
          key: `${i}-${idx}`,
          name: `name ${i}-${idx}`,
          sex: `${i} -${idx} male`,
          age: 10 + idx,
          address: `address ${i}-${idx}`,
        })),
    }));
  }

  export default {
    data() {
      return {
        code,
        columns: [],
        data: [],
        treeHandler: null,
      };
    },
    created() {
      this.columns = getCols.call(this);
      const treeHandler = new TreeHandler(getData.call(this));
      this.data = treeHandler.getTree();
      this.treeHandler = treeHandler;
    },
    methods: {
      onCheckboxChange(checked, node) {
        const { treeHandler } = this;
        const n = node;
        this.data = treeHandler.handle(n, checked);
      },
    },
  };
</script>

