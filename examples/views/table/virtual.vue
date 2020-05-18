<template>
  <div class="demo">
    <h4>海量数据</h4>
    <ux-table :columns="columns"
              v-model="data"
              :virtual-scroll="{minItemSize: 40, maxHeight: 400}" />
  </div>
</template>

<script>
  import { Table as UxTable, Checkbox as UxCheckbox } from '@cloud-sn/uxcool';
  import { TreeHandler } from '@cloud-sn/v-utils';

  function getCols() {
    const { onCheckboxChange } = this;
    return [
      {
        fixed: 'left',
        width: 200,
        key: 'name',
        title: 'Name',
        dataIndex: 'name',
        cellRender(text, record) {
          return (
            <span>
              <UxCheckbox
                control={true}
                checked={record.isChecked}
                indeterminate={record.isHalfChecked}
                onInput={checked => onCheckboxChange(checked, record)}
              />
              {String(record.isChecked)}
              {text}
            </span>
          );
        },
      },
      {
        // fixed: true,
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
        fixed: 'right',
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
    components: {
      UxTable,
      UxCheckbox,
    },
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
