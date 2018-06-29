<template>
  <article class="doc">
    <h1 class="ux-heading">Affix
      <span class="subtitle">固钉</span>
    </h1>
    <basic-demo/>
    <bottom-demo/>
    <event-demo/>
    <hr>
    <ux-heading level="2"
                id="api">API</ux-heading>

    <h3 class="mume-header"
        id="uxaffix">UxAffix</h3>

    <h4 class="mume-header"
        id="props">Props</h4>

    <table class="api-table">
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
          <td>offset-top</td>
          <td>滚动距离大于元素上部指定距离时触发浮动</td>
          <td>Number</td>
          <td></td>
        </tr>
        <tr>
          <td>offset-bottom</td>
          <td>滚动距离小于元素底部指定距离时触发浮动</td>
          <td>Number</td>
          <td></td>
        </tr>
      </tbody>
    </table>
    <blockquote>
      <p>只有设置了
        <code>offset-top</code>或
        <code>offset-bottom</code>时,
        <code>affix</code>才会起作用</p>
    </blockquote>
    <h4 class="mume-header"
        id="events">Events</h4>

    <table class="api-table">
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
          <td>浮动状态切换时触发</td>
          <td>Function(affixed)</td>
        </tr>
      </tbody>
    </table>
  </article>
</template>

<script>
  import BasicDemo from './basic.vue';
  import EventDemo from './event.vue';
  import BottomDemo from './bottom.vue';

  export default {
    components: {
      BasicDemo,
      EventDemo,
      BottomDemo,
    },
  };
</script>
