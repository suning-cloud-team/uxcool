<template>
  <article class="doc">
    <h1 class="ux-heading">Backtop
      <span class="subtitle">回到顶部</span>
    </h1>
    <basic-demo/>
    <custom-demo/>
    <hr>
    <ux-heading level="2"
                id="api">API</ux-heading>
    <table class="api-table">
      <caption>UxBacktop Props</caption>
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
          <td>visibilityHeight</td>
          <td>显示
            <code>backtop</code> 的高度
          </td>
          <td>Number</td>
          <td>400</td>
        </tr>
        <tr>
          <td>getTarget</td>
          <td>设置
            <code>backtop</code> 作用元素, 需返回一个 HTML 元素
          </td>
          <td>Function=&gt;HTMLElement</td>
          <td>()=&gt;window</td>
        </tr>
      </tbody>
    </table>

    <table class="api-table">
      <caption>UxBacktop Events</caption>
      <thead>
        <tr>
          <th>事件名</th>
          <th>描述</th>
          <th>回调</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>click</td>
          <td>点击
            <code>backtop</code> 后触发
          </td>
          <td>Function(e)</td>
        </tr>
      </tbody>
    </table>
  </article>
</template>

<script>
  import BasicDemo from './basic.vue';
  import CustomDemo from './custom.vue';

  export default {
    components: {
      BasicDemo,
      CustomDemo,
    },
  };
</script>
