<template>
  <ux-demo :height="200"
           title="拖拽排序"
           vertical>
    <div slot="demo">
      <ux-table :theme="theme"
                :columns="columns"
                v-model="data"
                draggable
                @drop="onDrop" />
    </div>
    <div slot="desc">
      通过<code>draggable</code>属性可指定拖拽功能。通过<code>allowDrag</code>和<code>allowDrop</code>属性可以定义行是否可以拖拽和释放。

      <blockquote>
        <p>暂不支持大数据量拖拽。拖拽事件只能拿到当前页表格行拖拽之后的数据，所以极度不推荐与分页、筛选、排序等功能同时使用，否则最终数据请自行想办法处理。</p>
      </blockquote>
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/table/draggable.vue';

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
    ];
  }

  function getData() {
    return Array.from({ length: 10 }, (_, i) => ({
      key: `key${i}`,
      name: `name ${i}`,
      age: Math.round(Math.random() * 30) + 10,
      address: `address ${i}`,
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
      this.data = getData.call(this);
    },
    methods: {
      onDrop(e) {
        // 通过getValue方法可以拿到拖拽后的数据
        const { getValue } = e;
        console.log('onDrag', e, getValue());
      },
    },
  };
</script>

