<template>
  <div class="demo">
    <h6>tree relation</h6>
    <ux-table :theme="theme"
              :columns="columns"
              v-model="data"
              :expanded-row-keys="expandRowKeys" />
    <ux-button @click="updateDataSource">update button</ux-button>
    <ux-button @click="getCheckedNodes">get checked nodes</ux-button>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import { TreeHandler } from '@suning/v-utils';
  import { Divider, Table as UxTable, Checkbox, Button } from '@suning/uxcool';

  function getCols() {
    const { onCheckboxChange } = this;
    return [
      {
        key: 'name',
        title: 'Name',
        dataIndex: 'name',
        cellRender(name, record) {
          return (
            <span>
              <Checkbox
                disabled={record.disabled}
                control={true}
                checked={record.isChecked}
                indeterminate={record.isHalfChecked}
                on-input={checked => onCheckboxChange(checked, record)}
              />
              <span style="margin-left:5px">{name}</span>
            </span>
          );
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
    return [
      {
        key: 1,
        name: 'John Brown sr.',
        age: 60,
        address: 'New York No. 1 Lake Park',
        children: [
          {
            key: 11,
            name: 'John Brown',
            age: 42,
            address: 'New York No. 2 Lake Park',
          },
          {
            key: 12,
            name: 'John Brown jr.',
            age: 30,
            address: 'New York No. 3 Lake Park',
            children: [
              {
                key: 121,
                name: 'Jimmy Brown',
                age: 16,
                address: 'New York No. 3 Lake Park',
              },
            ],
          },
          {
            key: 13,
            name: 'Jim Green sr.',
            age: 72,
            address: 'London No. 1 Lake Park',
            isChecked: true,
            children: [
              {
                key: 131,
                name: 'Jim Green',
                age: 42,
                address: 'London No. 2 Lake Park',
                children: [
                  {
                    key: 1311,
                    name: 'Jim Green jr.',
                    age: 25,
                    address: 'London No. 3 Lake Park',
                    disabled: true,
                    isChecked: false,
                  },
                  {
                    key: 1312,
                    name: 'Jimmy Green sr.',
                    age: 18,
                    address: 'London No. 4 Lake Park',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        key: 2,
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
      },
    ];
  }

  function getData2() {
    return [
      {
        key: 1,
        name: 'John Brown sr.',
        age: 60,
        address: 'New York No. 1 Lake Park',
      },
      {
        key: 2,
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        isChecked: true,
        children: [
          {
            key: 11,
            name: 'John Brown',
            age: 42,
            address: 'New York No. 2 Lake Park',
            disabled: true,
            isChecked: true,
          },
          {
            key: 12,
            name: 'John Brown jr.',
            age: 30,
            address: 'New York No. 3 Lake Park',
            children: [
              {
                key: 121,
                name: 'Jimmy Brown',
                age: 16,
                address: 'New York No. 3 Lake Park',
              },
            ],
          },
          {
            key: 13,
            name: 'Jim Green sr.',
            age: 72,
            address: 'London No. 1 Lake Park',
            children: [
              {
                key: 131,
                name: 'Jim Green',
                age: 42,
                address: 'London No. 2 Lake Park',
                children: [
                  {
                    key: 1311,
                    name: 'Jim Green jr.',
                    age: 25,
                    address: 'London No. 3 Lake Park',
                  },
                  {
                    key: 1312,
                    name: 'Jimmy Green sr.',
                    age: 18,
                    address: 'London No. 4 Lake Park',
                  },
                ],
              },
            ],
          },
        ],
      },
    ];
  }

  export default {
    components: {
      UxTable,
      Divider,
      UxCheckbox: Checkbox,
      UxButton: Button,
    },
    data() {
      return {
        expandRowKeys: [],
        columns: [],
        data: [],
        treeHandler: null,
      };
    },
    computed: mapState(['theme']),
    created() {
      this.columns = getCols.call(this);
      const treeHandler = new TreeHandler(getData.call(this));
      this.data = treeHandler.getTree();
      this.treeHandler = treeHandler;
    },
    methods: {
      onCheckboxChange(checked, node) {
        const { treeHandler } = this;
        const nNode = node;
        console.log('checked', checked, node);
        this.data = treeHandler.handle(nNode, checked);
      },
      getCheckedNodes() {
        console.log(this.treeHandler.getCheckedNodes().map(node => node.originNode));
      },
      updateDataSource() {
        this.data = this.treeHandler.setDataSource(getData2());
      },
    },
  };
</script>
