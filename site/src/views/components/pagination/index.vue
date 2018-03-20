<template>
  <article class="doc">
    <h1 class="ux-heading">Pagination
      <span class="subtitle">分页</span>
    </h1>
    <demo-basic></demo-basic>
    <demo-more></demo-more>
    <demo-simple></demo-simple>
    <demo-goto></demo-goto>
    <demo-custom></demo-custom>

    <hr>

    <ux-heading level="2"
                id="api">API</ux-heading>
    <table class="api-table">
      <caption>Props</caption>
      <thead>
        <tr>
          <th>参数名</th>
          <th>描述</th>
          <th>类型</th>
          <th>默认</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>total</td>
          <td>总数</td>
          <td>Number</td>
          <td>0</td>
        </tr>
        <tr>
          <td>current</td>
          <td>当前页</td>
          <td>Number</td>
          <td>1</td>
        </tr>
        <tr>
          <td>page-size</td>
          <td>每页条数</td>
          <td>Number</td>
          <td>10</td>
        </tr>
        <tr>
          <td>size</td>
          <td>当为[small]时, 小尺寸分页</td>
          <td>String</td>
          <td>''</td>
        </tr>
        <tr>
          <td>simple</td>
          <td>是否显示为简单分页</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>show-quick-jumper</td>
          <td>是否显示快速跳转</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>show-quick-jumper-confirm-btn</td>
          <td>是否显示快速跳转确定按钮</td>
          <td>Boolean</td>
          <td>true</td>
        </tr>
        <tr>
          <td>show-before-total</td>
          <td>分页条之前显示自定义内容</td>
          <td>Function(total, pageSize, totalPage, pageNo, range)
            <br>total: 总数; pageSize: 每页条数;totalPage:总页数; pageNo: 当前页;range:当前页数据范围</td>
          <td>noop</td>
        </tr>
        <tr>
          <td>show-after-total</td>
          <td>分页条之后显示自定义内容</td>
          <td>同上</td>
          <td>noop</td>
        </tr>
        <tr>
          <td>item-render</td>
          <td>自定义页码Dom结构</td>
          <td>(pageNo,type:'page'|'next'|'prev')=&gt;String</td>
          <td>-</td>
        </tr>
      </tbody>
    </table>
    <table class="api-table">
      <caption>Events</caption>
      <thead>
        <tr>
          <th>事件名</th>
          <th>描述</th>
          <th>回调</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>change</td>
          <td>页面变化时的回调</td>
          <td>Function(pageNo, pageSize)</td>
        </tr>
      </tbody>
    </table>
  </article>
</template>

<script>
  import DemoBasic from './basic.vue';
  import DemoMore from './more.vue';
  import DemoSimple from './simple.vue';
  import DemoGoto from './goto.vue';
  import DemoCustom from './custom.vue';

  export default {
    components: {
      DemoBasic,
      DemoMore,
      DemoSimple,
      DemoGoto,
      DemoCustom,
    },
  };
</script>
