<template>
  <article class="doc">
    <h1 class="ux-heading">Tag
      <span class="subtitle">标签</span>
    </h1>
    <basic-demo/>
    <color-demo/>
    <checkable-demo/>
    <hr>
    <ux-heading level="2"
                id="api">API</ux-heading>

    <table class="api-table">
      <caption>UxTag Props</caption>
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
          <td>color</td>
          <td>tag 颜色</td>
          <td>String</td>
          <td></td>
        </tr>
        <tr>
          <td>closable</td>
          <td>是否可关闭</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
      </tbody>
    </table>

    <table class="api-table">
      <caption>UxTag Events</caption>
      <thead>
        <tr>
          <th>事件名</th>
          <th>描述</th>
          <th>类型</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>close</td>
          <td>tag 关闭后触发</td>
          <td>Function(e)</td>
        </tr>
        <tr>
          <td>after-close</td>
          <td>tag 关闭动画结束后触发</td>
          <td>Function()</td>
        </tr>
      </tbody>
    </table>

    <table class="api-table">
      <caption>UxCheckableTag Props</caption>
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
          <td>checked</td>
          <td>是否选中</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
      </tbody>
    </table>

    <table class="api-table">
      <caption>UxCheckableTag Events</caption>
      <thead>
        <tr>
          <th>事件名</th>
          <th>描述</th>
          <th>类型</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>change</td>
          <td>checked 变化时触发</td>
          <td>Function(checked)</td>
        </tr>
      </tbody>
    </table>
  </article>
</template>


<script>
  import BasicDemo from './basic.vue';
  import CheckableDemo from './checkable.vue';
  import ColorDemo from './color.vue';

  export default {
    components: {
      BasicDemo,
      CheckableDemo,
      ColorDemo,
    },
  };
</script>
