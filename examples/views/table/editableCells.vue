<template>
  <div class="demo">
    <h6>editable table</h6>
    <button class="ux-btn"
            @click="add">Add</button>
    <ux-table :theme="theme"
              :columns="columns"
              v-model="data" />
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import { Divider, Table as UxTable, Icon, UxModal } from '@cloud-sn/uxcool';

  // @vue/components
  const EditableCell = {
    props: {
      value: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        editable: false,
      };
    },

    methods: {
      onKeyup(e) {
        if (e.keyCode === 13) {
          this.onOk(e);
        }
      },
      onOk(e) {
        this.editable = false;
        const val = this.$refs.inputRef.value;
        if (val !== this.value) {
          this.$emit('change', val, e);
        }
      },
      onEdit() {
        this.editable = true;
      },
    },
    render() {
      const {
        value, editable, onKeyup, onOk, onEdit
      } = this;
      const editElement = editable ? (
        <div class="editable-cell-input-wrapper">
          <input ref="inputRef" type="text" value={value} class="ux-input" on-keyup={onKeyup} />
          <Icon type="ok" class="editable-cell-icon-check" on-click={onOk} />
        </div>
        ) : (
        <div class="editable-cell-text-wrapper" on-dblclick={onEdit}>
          {value}
          <Icon type="edit" class="editable-cell-icon" on-click={onEdit} />
        </div>
      );
      return <div class="editable-cell">{editElement}</div>;
    },
  };

  function getCols() {
    const that = this;
    const { onChange, onDelete } = this;
    return [
      {
        key: 'name',
        width: 300,
        title: 'Name',
        dataIndex: 'name',
        cellRender(text, record) {
          return (
            <EditableCell
              value={text}
              on-change={(val) => {
                onChange(record.key, 'name', val);
              }}
            />
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
      {
        title: 'Action',
        cellRender(_, record) {
          return that.data.length > 1 ? (
            <span>
              <a
                on-click={() => {
                  onDelete(record.key);
                }}
              >
                Delete
              </a>
            </span>
            ) : null;
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
        address: 'New York No. 1 Lake Park',
      },
      {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
      },
      {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
      },
    ];
  }

  export default {
    components: {
      UxTable,
      Divider,
      EditableCell,
    },
    data() {
      return {
        columns: [],
        data: [],
        seed: 0,
      };
    },
    computed: mapState(['theme']),
    created() {
      this.columns = getCols.call(this);
      this.data = getData.call(this);
      this.seed = this.data.length;
    },
    methods: {
      onChange(key, dataIndex, val) {
        const { data } = this;
        const item = data.filter(v => v.key === key)[0];
        if (item) {
          item[dataIndex] = val;
          // TODO: update database...
          console.log(`change ${key} ${dataIndex} ${val}`);
        }
      },
      add() {
        const { data, seed } = this;
        const key = seed + 1;
        this.seed = key;
        data.push({
          key,
          name: `Joe Black ${key}`,
          age: 32,
          address: `Sidney No. 1 Lake Park ${key}`,
        });
      },
      onDelete(key) {
        const { data } = this;
        UxModal.confirm({
          title: 'Sure to delete?',
        }).then(
          () => {
            this.data = data.filter(v => v.key !== key);
          },
          () => {}
        );
      },
    },
  };
</script>

<style>
  .editable-cell {
    position: relative;
  }

  .editable-cell-input-wrapper,
  .editable-cell-text-wrapper {
    padding-right: 24px;
  }

  .editable-cell-text-wrapper {
    padding: 5px 24px 5px 5px;
  }

  .editable-cell-icon,
  .editable-cell-icon-check {
    position: absolute;
    right: 0;
    width: 20px;
    cursor: pointer;
  }

  .editable-cell-icon {
    line-height: 18px;
    display: none;
  }

  .editable-cell-icon-check {
    line-height: 28px;
  }

  .editable-cell:hover .editable-cell-icon {
    display: inline-block;
  }

  .editable-cell-icon:hover,
  .editable-cell-icon-check:hover {
    color: #108ee9;
  }

  .editable-add-btn {
    margin-bottom: 8px;
  }
</style>
