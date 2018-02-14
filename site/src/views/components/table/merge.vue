<template>
  <ux-demo title="合并单元格"
           :height="200">
    <div slot="demo">
      <table :class="clazz">
        <thead>
          <tr>
            <th rowspan="2">时间</th>
            <th colspan="3">信息</th>
          </tr>
          <tr>
            <th>姓名</th>
            <th>年龄</th>
            <th>城市</th>
          </tr>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2017-2018</td>
            <td>小明</td>
            <td>20</td>
            <td>南京</td>
          </tr>
          <tr>
            <td>2017-2018</td>
            <td>小华</td>
            <td>21</td>
            <td>杭州</td>
          </tr>
          <tr>
            <td>2017-2018</td>
            <td>小峰</td>
            <td>22</td>
            <td>上海</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div slot="desc"></div>
    <ux-code slot="code">
      {{code}}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/table/merge';

  export default {
    data() {
      return {
        code,
      };
    },
    computed: {
      theme() {
        return this.$store.state.theme;
      },
      clazz() {
        return ['ux-table', 'ux-table-hover', `ux-table-${this.theme}`];
      },
    },
  };
</script>
