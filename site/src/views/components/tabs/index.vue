<template>
  <article class="doc">
    <h1 class="ux-heading">Tabs
      <span class="subtitle">标签页</span>
    </h1>
    <demo-basic></demo-basic>
    <demo-disabled></demo-disabled>
    <demo-custom-icon></demo-custom-icon>
    <demo-scroll></demo-scroll>
    <demo-size></demo-size>
    <demo-position></demo-position>
    <demo-card></demo-card>

    <hr>
    <ux-heading level="2"
                id="api">API</ux-heading>
    <table class="api-table">
      <caption>UxTabs Props</caption>
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
          <td>type</td>
          <td>tabs 类型</td>
          <td>line|card</td>
          <td>line</td>
        </tr>
        <tr>
          <td>size</td>
          <td>tabs 大小</td>
          <td>default|small|large</td>
          <td>default</td>
        </tr>
        <tr>
          <td>tab-position</td>
          <td>tab 位置</td>
          <td>top | left | right | bottom| top</td>
          <td></td>
        </tr>
        <tr>
          <td>value</td>
          <td>默认选中的 tab,与 tab-pane 的 name 属性对应</td>
          <td>String</td>
          <td></td>
        </tr>
      </tbody>
    </table>

    <table class="api-table">
      <caption>UxTabs Events</caption>
      <thead>
        <tr>
          <th>事件名</th>
          <th>描述</th>
          <th>回调</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>tab-click</td>
          <td>点击 tab 时触发</td>
          <td>Function(name, tab, DomEvent)</td>
        </tr>
        <tr>
          <td>prev-click</td>
          <td>当存在滑动按钮时,prev 按钮点击时触发</td>
          <td>Function(DomEvent)</td>
        </tr>
        <tr>
          <td>next-click</td>
          <td>当存在滑动按钮时,next 按钮点击时触发</td>
          <td>Function(DomEvent)</td>
        </tr>
      </tbody>
    </table>

    <table class="api-table">
      <caption>UxTabPane Props</caption>
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
          <td>name</td>
          <td>唯一标识</td>
          <td>String</td>
          <td></td>
        </tr>
        <tr>
          <td>tab</td>
          <td>tab 头显示文字</td>
          <td>String</td>
          <td></td>
        </tr>
        <tr>
          <td>disabled</td>
          <td>是否禁用</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
      </tbody>
    </table>

    <table class="api-table">
      <caption>UxTabPane Slots</caption>
      <thead>
        <tr>
          <th>name</th>
          <th>描述</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>tab</td>
          <td>自定义 tab 头</td>
        </tr>
      </tbody>
    </table>
  </article>
</template>

<script>
  import DemoBasic from './basic.vue';
  import DemoDisabled from './disabled.vue';
  import DemoCustomIcon from './customIcon.vue';
  import DemoScroll from './scroll.vue';
  import DemoSize from './size.vue';
  import DemoPosition from './position.vue';
  import DemoCard from './card.vue';

  export default {
    components: {
      DemoBasic,
      DemoDisabled,
      DemoCustomIcon,
      DemoScroll,
      DemoSize,
      DemoPosition,
      DemoCard,
    },
  };
</script>
