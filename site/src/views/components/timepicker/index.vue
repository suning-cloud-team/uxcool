<template>
  <article class="doc">
    <h1 class="ux-heading">Timepicker
      <span class="subtitle">时间选择器</span>
    </h1>
    <basic-demo/>

    <format-demo />
    <size-demo/>
    <disabled-demo />
    <disabled-hours-demo />
    <show-hour-demo />
    <step-demo />
    <custom-demo />
    <addon-demo />
    <hr>
    <ux-heading level="2">API</ux-heading>

    <h3 class="mume-header"
        id="uxtimepicker">UxTimepicker</h3>

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
          <td>value</td>
          <td>值</td>
          <td>Date</td>
          <td>null</td>
        </tr>
        <tr>
          <td>open-value</td>
          <td>面板打开时的默认值, 当存在
            <code>value</code>时,以
            <code>value</code>为准</td>
          <td>Date</td>
          <td>new Date()</td>
        </tr>
        <tr>
          <td>visible</td>
          <td>是否显示下拉面板</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>disabled</td>
          <td>是否禁用</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>popup-class</td>
          <td>自定义面板类</td>
          <td>String|Object|Array</td>
          <td></td>
        </tr>
        <tr>
          <td>popup-style</td>
          <td>自定义面板样式</td>
          <td>Object</td>
          <td></td>
        </tr>
        <tr>
          <td>get-popup-container</td>
          <td>自定义面板渲染位置</td>
          <td>Function=&gt;HTMLElement</td>
          <td></td>
        </tr>
        <tr>
          <td>autofocus</td>
          <td>自动获取焦点</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>size</td>
          <td>大小,可选值:
            <code>small</code>,
            <code>default</code>,
            <code>large</code>
          </td>
          <td>String</td>
          <td></td>
        </tr>
        <tr>
          <td>addon</td>
          <td>额外内容</td>
          <td>String</td>
          <td></td>
        </tr>
        <tr>
          <td>allow-clear</td>
          <td>是否显示清除按钮</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>clear-text</td>
          <td>清除按钮提示文案</td>
          <td>String</td>
          <td>clear</td>
        </tr>
        <tr>
          <td>placeholder</td>
          <td>占位符</td>
          <td>String</td>
          <td>请选择时间</td>
        </tr>
        <tr>
          <td>format</td>
          <td>
            <a href="https://date-fns.org/v1.29.0/docs/format">时间格式</a>,(此字段可以控制面板中实际展示的列)</td>
          <td>String</td>
          <td>HH:mm:ss</td>
        </tr>
        <tr>
          <td>hour-step</td>
          <td>小时间隔</td>
          <td>Number|String</td>
          <td>1</td>
        </tr>
        <tr>
          <td>minute-step</td>
          <td>分钟间隔</td>
          <td>Number|String</td>
          <td>1</td>
        </tr>
        <tr>
          <td>second-step</td>
          <td>秒间隔</td>
          <td>Number|String</td>
          <td>1</td>
        </tr>
        <tr>
          <td>disabled-hours</td>
          <td>自定义小时禁用项</td>
          <td>Function() =&gt;[]</td>
          <td></td>
        </tr>
        <tr>
          <td>disabled-minutes</td>
          <td>自定义分钟禁用项</td>
          <td>Function(hour) =&gt;[]</td>
          <td></td>
        </tr>
        <tr>
          <td>disabled-seconds</td>
          <td>自定义秒禁用项</td>
          <td>Function(hour,minutes)=&gt;[]</td>
          <td></td>
        </tr>
        <tr>
          <td>hide-disabled-option</td>
          <td>禁用项是否隐藏</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>input-readonly</td>
          <td>输入框是否只读</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>focus-on-open</td>
          <td>面板打开时,输入框是否获取选中</td>
          <td>Boolean</td>
          <td>false</td>
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
          <td>选取值时触发</td>
          <td>Function(value,formatValue )</td>
        </tr>
        <tr>
          <td>popup-visible-change</td>
          <td>面板显示/隐藏时触发</td>
          <td>Function(visible )</td>
        </tr>
      </tbody>
    </table>
    <h4 class="mume-header"
        id="methods">Methods</h4>

    <table class="api-table">
      <thead>
        <tr>
          <th>名称</th>
          <th>描述</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>focus</td>
          <td>设置焦点</td>
        </tr>
        <tr>
          <td>blur</td>
          <td>失去焦点</td>
        </tr>
      </tbody>
    </table>
  </article>
</template>

<script>
  import BasicDemo from './basic.vue';
  import SizeDemo from './size.vue';
  import DisabledDemo from './disabled.vue';
  import DisabledHoursDemo from './disabledHours.vue';
  import ShowHourDemo from './showhour.vue';
  import StepDemo from './step.vue';
  import AddonDemo from './addon.vue';
  import CustomDemo from './custom.vue';
  import FormatDemo from './format.vue';

  export default {
    components: {
      BasicDemo,
      SizeDemo,
      DisabledDemo,
      DisabledHoursDemo,
      ShowHourDemo,
      StepDemo,
      AddonDemo,
      CustomDemo,
      FormatDemo,
    },
  };
</script>
