<template>
  <div class="demo">
    <h6>editable rows</h6>
    <ux-table :theme="theme"
              :columns="columns"
              v-model="data" />
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import { Divider, Table as UxTable, Modal } from '@cloud-sn/uxcool';

  // @vue/components
  const EditableCell = {
    props: {
      value: {
        type: null,
        default: '',
      },
      editable: {
        type: Boolean,
        default: false,
      },
    },
    methods: {
      onChange(e) {
        this.$emit('change', e.target.value);
      },
    },
    render() {
      const { editable, value, onChange } = this;
      return (
        <div>
          {editable ? (
            <input type="text" value={value} on-change={onChange} class="ux-input" />
          ) : (
            value
          )}
        </div>
      );
    },
  };

  function getCols() {
    const {
      cellRender, onEdit, onSave, onCancel
    } = this;
    return [
      {
        key: 'name',
        width: 300,
        title: 'Name',
        dataIndex: 'name',
        cellRender,
      },
      {
        key: 'age',
        title: 'Age',
        dataIndex: 'age',
        cellRender,
      },
      {
        key: 'addr',
        title: 'Addr',
        dataIndex: 'address',
        cellRender,
      },
      {
        title: 'Action',
        cellRender(_, record) {
          return (
            <div class="editable-row-operations">
              {record.editable ? (
                <span>
                  <a
                    on-click={() => {
                      onSave(record.key);
                    }}
                  >
                    Save
                  </a>
                  <Divider type="vertical" />
                  <a
                    on-click={() => {
                      onCancel(record.key);
                    }}
                  >
                    Cancel
                  </a>
                </span>
              ) : (
                <span>
                  <a
                    on-click={() => {
                      onEdit(record.key);
                    }}
                  >
                    Edit
                  </a>
                </span>
              )}
            </div>
          );
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
        editable: false,
      },
      {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        editable: false,
      },
      {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        editable: false,
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
        editData: {},
      };
    },
    computed: mapState(['theme']),
    created() {
      this.columns = getCols.call(this);
      this.data = getData.call(this);
    },
    methods: {
      cellRender(text, record, rowIdx, column) {
        const { onChange } = this;
        return (
          <EditableCell
            editable={record.editable}
            value={text}
            on-change={(val) => {
              onChange(record.key, column.dataIndex, val);
            }}
          />
        );
      },
      onEdit(key) {
        const item = this.data.filter(v => v.key === key)[0];
        if (item) {
          item.editable = true;
        }
      },
      onChange(key, dataIndex, val) {
        const { editData } = this;
        const item = editData[key];
        if (item) {
          item[dataIndex] = val;
        } else {
          editData[key] = { [dataIndex]: val };
        }
      },
      onSave(key) {
        const { editData, data } = this;
        const item = data.filter(v => v.key === key)[0];
        const editItem = editData[key];
        if (item && editItem) {
          Object.keys(editItem).forEach((k) => {
            item[k] = editItem[k];
          });
          item.editable = false;
        }
      },
      onCancel(key) {
        const { data } = this;
        Modal.confirm({
          title: 'Sure to cancel?',
        }).then(
          () => {
            const item = data.filter(v => v.key === key)[0];
            if (item) {
              item.editable = false;
            }
          },
          () => {}
        );
      },
    },
  };
</script>

