<template>
  <article class="doc">
    <h1 class="ux-heading">Tooltip
      <span class="subtitle">工具提示</span>
    </h1>

    <demo-basic>
    </demo-basic>
    <demo-position>
    </demo-position>
    <demo-custom></demo-custom>
    <hr>

    <ux-heading level="2"
                id="api">API</ux-heading>
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
          <td>visible</td>
          <td>是否显示</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>placement</td>
          <td>显示位置,可选值:
            <code>top</code>,
            <code>left</code>,
            <code>right</code>,
            <code>bottom</code>,
            <code>topLeft</code>,
            <code>topRight</code>,
            <code>bottomLeft</code>,
            <code>bottomRight</code>,
            <code>leftTop</code>,
            <code>leftBottom</code>,
            <code>rightTop</code>,
            <code>rightBottom</code>
          </td>
          <td>String</td>
          <td>top</td>
        </tr>
        <tr>
          <td>trigger</td>
          <td>触发行为,可选值:
            <code>hover</code>,
            <code>click</code>,
            <code>focus</code>
          </td>
          <td>String|Array</td>
          <td>hover</td>
        </tr>
        <tr>
          <td>tooltipClass</td>
          <td>自定义 tooltip class</td>
          <td>String|Object|Array</td>
          <td></td>
        </tr>
        <tr>
          <td>tooltipStyle</td>
          <td>自定义 tooltip style</td>
          <td>Object</td>
          <td></td>
        </tr>
        <tr>
          <td>disabled</td>
          <td>是否禁用</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>mouseEnterDelay</td>
          <td>tooltip 延迟显示时间(ms)</td>
          <td>Number</td>
          <td>100</td>
        </tr>
        <tr>
          <td>mouseLeaveDelay</td>
          <td>tooltip 延迟隐藏时间(ms)</td>
          <td>Number</td>
          <td>100</td>
        </tr>
        <tr>
          <td>content</td>
          <td>tooltip 内容</td>
          <td>String</td>
          <td></td>
        </tr>
        <tr>
          <td>arrowPointAtCenter</td>
          <td>箭头是否指向目标中心</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>autoAdjustOverflow</td>
          <td>被遮挡时是否自动调整位置</td>
          <td>Boolean</td>
          <td>true</td>
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
          <td>content</td>
          <td>自定义 tooltip 内容</td>
        </tr>
      </tbody>
    </table>
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
          <td>visible-change</td>
          <td>显示或隐藏时回调</td>
          <td>Function(visible)</td>
        </tr>
      </tbody>
    </table>
  </article>
</template>

<script>
  import DemoBasic from './basic.vue';
  import DemoPosition from './position.vue';
  import DemoCustom from './custom.vue';

  export default {
    components: {
      DemoBasic,
      DemoPosition,
      DemoCustom,
    },
  };
</script>
