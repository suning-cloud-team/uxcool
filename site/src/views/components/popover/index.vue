<template>
  <article class="doc">
    <h1 class="ux-heading">Popover
      <span class="subtitle">悬浮框</span>
    </h1>
    <demo-basic></demo-basic>
    <demo-trigger></demo-trigger>
    <demo-title></demo-title>
    <demo-style></demo-style>
    <demo-content></demo-content>
    <demo-visible></demo-visible>

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
          <td>visible</td>
          <td>是否显示</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>placement</td>
          <td>显示位置</td>
          <td>top|left|right|bottom|topLeft|topRight|bottomLeft|bottomRight|leftTop|leftBottom|rightTop|rightBottom</td>
          <td>top</td>
        </tr>
        <tr>
          <td>trigger</td>
          <td>触发行为</td>
          <td>hover|click|foucs,可同时有多种行为</td>
          <td>hover</td>
        </tr>
        <tr>
          <td>popoverClass</td>
          <td>自定义popover class</td>
          <td>String,Object</td>
          <td></td>
        </tr>
        <tr>
          <td>popoverStyle</td>
          <td>自定义popover style</td>
          <td>Object</td>
          <td></td>
        </tr>
        <tr>
          <td>mouseEnterDelay</td>
          <td>popover延迟显示时间(ms)</td>
          <td>Number</td>
          <td>100</td>
        </tr>
        <tr>
          <td>mouseLeaveDelay</td>
          <td>popover延迟隐藏时间(ms)</td>
          <td>Number</td>
          <td>100</td>
        </tr>
        <tr>
          <td>disabled</td>
          <td>是否禁用</td>
          <td>Boolean</td>
          <td></td>
        </tr>
        <tr>
          <td>title</td>
          <td>popover标题</td>
          <td>String</td>
          <td></td>
        </tr>
        <tr>
          <td>content</td>
          <td>popover内容</td>
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
  import DemoStyle from './style.vue';
  import DemoContent from './content.vue';
  import DemoTitle from './title.vue';
  import DemoTrigger from './trigger.vue';
  import DemoVisible from './visible.vue';

  export default {
    components: {
      DemoBasic,
      DemoStyle,
      DemoContent,
      DemoTitle,
      DemoTrigger,
      DemoVisible,
    },
  };
</script>
