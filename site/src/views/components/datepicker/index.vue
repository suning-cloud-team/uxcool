<template>
  <article class="doc">
    <h1 class="ux-heading">DatePicker
      <span class="subtitle">日期控件</span>
    </h1>
    <demo-basic></demo-basic>
    <demo-format></demo-format>
    <demo-show-time></demo-show-time>
    <demo-disabled-date></demo-disabled-date>
    <demo-disabled></demo-disabled>
    <demo-quick-selector></demo-quick-selector>

    <hr>

    <ux-heading level="2"
                id="api">API</ux-heading>
    <table class="api-table">
      <caption>UxDatePicker Props</caption>
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
          <td>locale</td>
          <td>国际化配置</td>
          <td>Object</td>
          <td>import locale from ‘@suning/uxcool/es/locale/en_US’
          </td>
        </tr>
        <tr>
          <td>theme</td>
          <td>主题</td>
          <td>light|dark</td>
          <td>light</td>
        </tr>
        <tr>
          <td>is-open</td>
          <td>弹层是否展开</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>value</td>
          <td>当前选中值</td>
          <td>Date</td>
          <td></td>
        </tr>
        <tr>
          <td>disabled</td>
          <td>是否禁用</td>
          <td>Boolean</td>
          <td></td>
        </tr>
        <tr>
          <td>format</td>
          <td>展示的日期格式</td>
          <td>String</td>
          <td>YYYY-MM-DD</td>
        </tr>
        <tr>
          <td>show-time</td>
          <td>是否可选择时间</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>show-ok</td>
          <td>是否展示确定按钮</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>show-today</td>
          <td>是否显示今天按钮</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>disabled-date</td>
          <td>不可选择日期</td>
          <td>Function(current:Date)=&gt;Boolean</td>
          <td></td>
        </tr>
        <tr>
          <td>disabled-time</td>
          <td>不可选择时间</td>
          <td>Function()=&gt;{<br>disabledHours:()=&gt;Number[],<br>disabledMinutes: (hour)=&gt;Number[],<br>disabledSeconds:(hour,minute)=&gt;Number[] <br>}</td>
          <td></td>
        </tr>
        <tr>
          <td>allow-clear</td>
          <td>是否显示清除按钮</td>
          <td>Boolean</td>
          <td>true</td>
        </tr>
        <tr>
          <td>placeholder</td>
          <td>输入框提示文字</td>
          <td>String</td>
          <td></td>
        </tr>
      </tbody>
    </table>
    <table class="api-table">
      <caption>UxDatePicker Events</caption>
      <thead>
        <tr>
          <th>事件名</th>
          <th>描述</th>
          <th>回调</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>open-change</td>
          <td>弹窗关闭和打开时触发</td>
          <td>Function(visible)</td>
        </tr>
        <tr>
          <td>change</td>
          <td>用户选择时间后触发;当确定按钮存在时, 点击确定按钮后触发</td>
          <td>Function(values:Date[])</td>
        </tr>
        <tr>
          <td>ok</td>
          <td>当存在确定按钮时, 用户点击确定按钮触发</td>
          <td>Function(values:Date[])</td>
        </tr>
      </tbody>
    </table>
    <table class="api-table">
      <caption>UxRangeDatePicker Props</caption>
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
          <td>locale</td>
          <td>国际化配置</td>
          <td>Object</td>
          <td>import locale from ‘@suning/uxcool/es/locale/en_US’</td>
        </tr>
        <tr>
          <td>theme</td>
          <td>主题</td>
          <td>light|dark</td>
          <td>light</td>
        </tr>
        <tr>
          <td>is-open</td>
          <td>弹层是否展开</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>selectedValue</td>
          <td>当前选中值</td>
          <td>Array&lt;date&gt;
          </td>
          <td></td>
        </tr>
        <tr>
          <td>disabled</td>
          <td>是否禁用</td>
          <td>Boolean</td>
          <td></td>
        </tr>
        <tr>
          <td>format</td>
          <td>展示的日期格式</td>
          <td>String</td>
          <td>YYYY-MM-DD</td>
        </tr>
        <tr>
          <td>show-time</td>
          <td>是否可选择时间</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>show-ok</td>
          <td>是否展示确定按钮</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>show-today</td>
          <td>是否显示返回今天按钮</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>disabled-date</td>
          <td>不可选择日期</td>
          <td>Function(current:Date)=&gt;Boolean</td>
          <td></td>
        </tr>
        <tr>
          <td>disabled-time</td>
          <td>不可选择时间</td>
          <td>Function()=&gt;{<br>disabledHours:()=&gt;Number[],<br>disabledMinutes: (hour)=&gt;Number[],<br>disabledSeconds:(hour,minute)=&gt;Number[] <br>}</td>
          <td></td>
        </tr>
        <tr>
          <td>allow-clear</td>
          <td>是否显示清除按钮</td>
          <td>Boolean</td>
          <td>true</td>
        </tr>
        <tr>
          <td>placeholder</td>
          <td>输入框提示文字</td>
          <td>[String,Array]</td>
          <td></td>
        </tr>
        <tr>
          <td>ranges</td>
          <td>预设时间范围</td>
          <td>Object{String: Date:[]}</td>
          <td></td>
        </tr>
      </tbody>
    </table>
    <table class="api-table">
      <caption>UxRangeDatePicker Events</caption>
      <thead>
        <tr>
          <th>事件名</th>
          <th>描述</th>
          <th>回调</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>open-change</td>
          <td>弹窗关闭和打开时触发</td>
          <td>Function(visible)</td>
        </tr>
        <tr>
          <td>change</td>
          <td>用户选择时间后触发;当确定按钮存在时, 点击确定按钮后触发</td>
          <td>Function(values:Date[])</td>
        </tr>
        <tr>
          <td>ok</td>
          <td>当存在确定按钮时 , 用户点击确定按钮触发</td>
          <td>Function(values:Date[])</td>
        </tr>
      </tbody>
    </table>
  </article>
</template>
<script>
  import DemoBasic from './basic.vue';
  import DemoFormat from './format.vue';
  import DemoShowTime from './showTime.vue';
  import DemoDisabledDate from './disabledDate.vue';
  import DemoDisabled from './disabled.vue';
  import DemoQuickSelector from './quickSelector.vue';

  export default {
    components: {
      DemoBasic,
      DemoFormat,
      DemoShowTime,
      DemoDisabledDate,
      DemoDisabled,
      DemoQuickSelector,
    },
  };
</script>
