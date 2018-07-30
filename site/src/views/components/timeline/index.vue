<template>
  <article class="doc">
    <h1 class="ux-heading">Timeline
      <span class="subtitle">时间轴</span>
    </h1>
    <basic-demo />
    <color-demo />
    <reverse-demo />
    <pending-demo />
    <dot-demo />
    <hr>
    <ux-heading level="2"
                id="api">API</ux-heading>

    <h3 class="mume-header"
        id="uxtimeline">UxTimeline</h3>

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
          <td>pending</td>
          <td>是否显示虚拟节点</td>
          <td>Boolean|String</td>
          <td>false</td>
        </tr>
        <tr>
          <td>reverse</td>
          <td>是否倒序</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
      </tbody>
    </table>
    <h4 class="mume-header"
        id="slots">Slots</h4>

    <table class="api-table">
      <thead>
        <tr>
          <th>名称</th>
          <th>描述</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>pending</td>
          <td>自定义虚拟节点内容</td>
        </tr>
        <tr>
          <td>pendingDot</td>
          <td>自定义虚拟节点的轴点</td>
        </tr>
      </tbody>
    </table>
    <h3 class="mume-header"
        id="uxtimelineitem">UxTimelineItem</h3>

    <h4 class="mume-header"
        id="props-1">Props</h4>

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
          <td>color</td>
          <td>轴点颜色,可选值:
            <code>blue</code>,
            <code>red</code>,
            <code>green</code>,或自定义颜色</td>
          <td>String</td>
          <td>blue</td>
        </tr>
      </tbody>
    </table>
    <h4 class="mume-header"
        id="slots-1">Slots</h4>

    <table class="api-table">
      <thead>
        <tr>
          <th>名称</th>
          <th>描述</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>dot</td>
          <td>自定义轴点</td>
        </tr>
      </tbody>
    </table>
  </article>
</template>

<script>
  import BasicDemo from './basic.vue';
  import ColorDemo from './color.vue';
  import ReverseDemo from './reverse.vue';
  import PendingDemo from './pending.vue';
  import DotDemo from './dot.vue';

  export default {
    components: {
      BasicDemo,
      ColorDemo,
      ReverseDemo,
      PendingDemo,
      DotDemo,
    },
  };
</script>
