<template>
  <div>
    <ux-table :columns="columns"
              v-model="data"
              :virtual-scroll="{itemSize: 40, maxHeight: 400}" />
  </div>
</template>

<script>
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

