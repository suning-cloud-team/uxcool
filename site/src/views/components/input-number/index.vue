<template>
  <article class="doc">
    <h1 class="ux-heading">Input number
      <span class="subtitle">数字输入框</span>
    </h1>

    <demo-basic />
    <demo-step />
    <demo-precision />
    <demo-size />
    <demo-disabled />
    <demo-focus />
    <demo-event />

    <hr>

    <ux-heading level="2"
                id="api">API</ux-heading>

    <table class="api-table">
      <caption>UxInputNumber Props</caption>
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
          <td>当前值</td>
          <td>Number|String</td>
          <td></td>
        </tr>
        <tr>
          <td>max</td>
          <td>最大值</td>
          <td>Number</td>
          <td>Number.MAX_SAFE_INTEGER</td>
        </tr>
        <tr>
          <td>min</td>
          <td>最小值</td>
          <td>Number</td>
          <td>Number.MIN_SAFE_INTEGER</td>
        </tr>
        <tr>
          <td>step</td>
          <td>步长</td>
          <td>Number</td>
          <td>1</td>
        </tr>
        <tr>
          <td>precision</td>
          <td>数值精度</td>
          <td>Number</td>
          <td>null</td>
        </tr>
        <tr>
          <td>size</td>
          <td>大小,可选值:
            <code>large</code>,
            <code>default</code>,
            <code>small</code>
          </td>
          <td>String</td>
          <td>default</td>
        </tr>
        <tr>
          <td>autofocus</td>
          <td>自动获取焦点</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>disabled</td>
          <td>是否不可用</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>readonly</td>
          <td>是否只读</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>formatter</td>
          <td>格式化输入框值</td>
          <td>Function(currentVal)</td>
          <td>null</td>
        </tr>
        <tr>
          <td>parser</td>
          <td>指定输入框值转换方式, 与 formatter 共同使用</td>
          <td>Function(currentVal)</td>
          <td></td>
        </tr>
      </tbody>
    </table>

    <table class="api-table">
      <caption>UxInputNumber Events</caption>
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
          <td>只在绑定值变化时触发;
            <code>input</code> 中输入时,不会触发</td>
          <td>Function(val)</td>
        </tr>
      </tbody>
    </table>
    <blockquote>
      <p>支持原生 input 事件</p>
    </blockquote>

    <table class="api-table">
      <caption>UxInputNumber Methods</caption>
      <thead>
        <tr>
          <th>名称</th>
          <th>描述</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>focus</td>
          <td>获得焦点</td>
        </tr>
        <tr>
          <td>blur</td>
          <td>移除焦点</td>
        </tr>
      </tbody>
    </table>

  </article>
</template>

<script>
  import demoBasic from './basic.vue';
  import demoStep from './step.vue';
  import demoPrecision from './precision.vue';
  import demoSize from './size.vue';
  import demoDisabled from './disabled.vue';
  import demoFocus from './focus.vue';
  import demoEvent from './event.vue';

  export default {
    components: {
      demoBasic,
      demoStep,
      demoPrecision,
      demoSize,
      demoDisabled,
      demoFocus,
      demoEvent,
    },
  };
</script>
