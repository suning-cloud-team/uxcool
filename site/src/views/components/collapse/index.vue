<template>
  <article class="doc">
    <h1 class="ux-heading">Collapse
      <span class="subtitle">折叠面板</span>
    </h1>
    <basic-demo />
    <accordion-demo />
    <nest-demo />
    <simple-demo />
    <custom-demo />
    <control-demo />
    <hr>
    <ux-heading level="2"
                id="api">API</ux-heading>

    <h3 class="mume-header">UxCollapse</h3>

    <h4 class="mume-header">Props</h4>
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
          <td>active-keys</td>
          <td>激活面板的 key, 与 Panel 的
            <code>name</code>字段对应, 区分
            <code>Number</code>和
            <code>String</code>
          </td>
          <td>String|Number|Array</td>
          <td></td>
        </tr>
        <tr>
          <td>accordion</td>
          <td>手风琴模式</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>border</td>
          <td>是否右边框</td>
          <td>Boolean</td>
          <td>true</td>
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
          <td>change</td>
          <td>切换选中时触发,当
            <code>accordion = true</code>时,参数值为
            <code>String</code>类型, 其余为情况为
            <code>Array</code>
          </td>
          <td>Function(val:String|Array)</td>
        </tr>
      </tbody>
    </table>
    <h3 class="mume-header"
        id="uxcollapsepanel">UxCollapsePanel</h3>

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
          <td>name</td>
          <td>唯一性标识,区分
            <code>String</code>|
            <code>Number</code>
          </td>
          <td>String|Number</td>
          <td></td>
        </tr>
        <tr>
          <td>header</td>
          <td>面板头部内容</td>
          <td>String</td>
          <td></td>
        </tr>
        <tr>
          <td>header-class</td>
          <td>自定义头部样式</td>
          <td>String|Object|Array</td>
          <td></td>
        </tr>
        <tr>
          <td>show-arrow</td>
          <td>是否显示箭头</td>
          <td>Boolean</td>
          <td>true ｜</td>
        </tr>
        <tr>
          <td>disabled</td>
          <td>是否禁用</td>
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
          <td>header</td>
          <td>自定义面板头部内容</td>
        </tr>
      </tbody>
    </table>
  </article>
</template>

<script>
  import BasicDemo from './basic.vue';
  import AccordionDemo from './accordion.vue';
  import NestDemo from './nest.vue';
  import SimpleDemo from './simple.vue';
  import CustomDemo from './custom.vue';
  import ControlDemo from './control.vue';

  export default {
    components: {
      BasicDemo,
      AccordionDemo,
      NestDemo,
      SimpleDemo,
      CustomDemo,
      ControlDemo,
    },
  };
</script>
