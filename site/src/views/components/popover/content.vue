<template>
  <ux-demo title="嵌套内容">
    <div slot="demo">
      <ux-popover trigger="click"
                  :theme="theme"
                  placement="topLeft"
                  arrow-point-at-center
                  title="表格">
        <button class="ux-btn">展开表格</button>
        <table slot="content"
               class="ux-table"
               style="width:550px">
          <tr>
            <th>名称</th>
            <th>日期</th>
            <th>地址</th>
          </tr>
          <tr v-for="(tr,i) in table"
              :key="i">
            <td>{{tr.name}}</td>
            <td>{{tr.date}}</td>
            <td>{{tr.address}}</td>
          </tr>
        </table>
      </ux-popover>
    </div>
    <div slot="desc">
      popover可嵌套多种内容
    </div>
    <ux-code slot="code">
      {{code}}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/popover/content';

  export default {
    data() {
      return {
        code,
        table: [
          { name: '测试1', date: '2019-01-11', address: '地址1' },
          { name: '测试2', date: '2019-02-12', address: '地址2' },
          { name: '测试3', date: '2019-03-13', address: '地址3' },
        ],
      };
    },
    computed: {
      theme() {
        return this.$store.state.theme;
      },
    },
  };
</script>
