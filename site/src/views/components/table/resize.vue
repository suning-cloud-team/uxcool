<template>
  <ux-demo title="拖拽调整列宽"
           :height="200"
           vertical>
    <div slot="demo">
      <ux-table v-model="data"
                :columns="columns"
                bordered
                @column-width-resize="onColResize" />
    </div>
    <div slot="desc">
      通过设置列的<code>resizable</code>属性为true，在列设置了<code>width</code>的情况下，可以拖拽调整列宽，拖拽完成会触发<code>column-width-resize</code>事件, 建议与<code>bordered</code>一起使用。
      <blockquote>
        <p>暂不支持大数据拖拽。目前的实现会修改传入的<code>columns</code>的数据，后期会考虑优化。</p>
      </blockquote>
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/table/resize.vue';

  function getCols() {
    return [
      {
        key: 'name',
        title: 'Name',
        dataIndex: 'name',
        width: 200,
        resizable: true,
        cellRender(text) {
          return <a href="#">{text}</a>;
        },
      },
      {
        key: 'age',
        title: 'Age',
        dataIndex: 'age',
        width: 200,
        resizable: true,
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
              <a href="#">Action-{record.name}</a>
              <ux-divider type="vertical" />
              <a href="#">Delete</a>
            </span>
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
      this.data = getData.call(this);
    },
    methods: {
      onColResize(...args) {
        console.log('onColResize', ...args);
      },
    },
  };
</script>

