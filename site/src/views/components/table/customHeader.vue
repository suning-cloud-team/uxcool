<template>
  <ux-demo :height="200"
           title="自定义表头"
           vertical>
    <div slot="demo">
      <ux-table :columns="columns"
                :on-header-row="onHeaderRow"
                :on-row="onRow"
                v-model="data" />
    </div>
    <div slot="desc">
      通过 <code>columns.onHeaderCell</code>, <code>columns.onCell</code>可以对单元格进行自定义，<code>onHeaderRow</code>和<code>onRow</code>可以对表格行进行定制。如果想要自定义单元格内容，又要使用内置的过滤排序功能，则可以使用<code>title</code>属性的函数写法。可以F12查看渲染出来的表格。
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/table/customHeader.vue';

  function getCols() {
    const that = this;
    return [
      {
        key: 'name',
        title: 'Name',
        align: 'center',
        dataIndex: 'name',
        cellRender(text) {
          return <a href="#">{text}</a>;
        },
      },
      {
        key: 'age',
        // 0.5.0-next.60版本开始支持jsx函数
        title(h) {
          return (
            <span>
              <span>Age</span>
              <ux-tooltip content="自定义内容同时使用内置排序">
                <ux-icon type="question-circle-t" class="ml-xs-2" />
              </ux-tooltip>
            </span>
          );
        },
        dataIndex: 'age',
        sorter(a, b) {
          return a.age - b.age;
        },
      },
      {
        key: 'addr',
        title: 'Addr',
        dataIndex: 'address',
        onHeaderCell: () => {
          // 这一步不可少，记得同时把该方法改为箭头函数，否则会报h重复注入
          // eslint-disable-next-line
          const h = that.$createElement;
          return {
            title: <div style="color:red">abc</div>,
            on: {
              click: () => {
                console.log('点击了表头');
              },
            },
            // 还可以返回其他属性如`className`, `style`, `attrs`等
            className: 'bar',
          };
        },
        onCell() {
          return {
            className: 'baz',
          };
        },
      },
      {
        title: 'Action',
        cellRender(_, record) {
          const h = this.$createElement;
          return h('span', [
            h(
              'a',
              {
                attrs: {
                  href: '#',
                },
              },
              [`Action-${record.name}`]
            ),
          ]);
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
    created() {
      this.columns = getCols.call(this);
      this.data = getData.call(this);
    },
    methods: {
      onHeaderRow() {
        return {
          className: 'foo',
        };
      },
      onRow(_, i) {
        return {
          className: i % 2 === 0 ? 'even' : 'odd',
        };
      },
    },
  };
</script>
