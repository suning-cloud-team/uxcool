<template>
  <article class="doc">
    <h1 class="ux-heading">Step
      <span class="subtitle">步骤条</span>
    </h1>

    <demo-basic></demo-basic>
    <demo-icon></demo-icon>
    <demo-change></demo-change>
    <demo-vertical></demo-vertical>
    <demo-small></demo-small>
    <demo-error></demo-error>
    <demo-dot></demo-dot>

    <hr>

    <ux-heading level="2"
                id="api">API</ux-heading>
    <table class="api-table">
      <caption>UxSteps Props</caption>
      <thead>
        <tr>
          <th>属性</th>
          <th>描述</th>
          <th>类型</th>
          <th>默认值</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>prefix-cls</td>
          <td>步骤条类名</td>
          <td>String</td>
          <td>ux-steps</td>
        </tr>
        <tr>
          <td>icon-prefix</td>
          <td>图标类名前缀</td>
          <td>String</td>
          <td>fu</td>
        </tr>
        <tr>
          <td>direction</td>
          <td>步骤条方向, 可选值：'horizontal', 'vertical'</td>
          <td>String</td>
          <td>horizontal</td>
        </tr>
        <tr>
          <td>label-placement</td>
          <td>步骤标题显示方式，可选值：'horizontal', 'vertical'</td>
          <td>String</td>
          <td>horizontal</td>
        </tr>
        <tr>
          <td>current</td>
          <td>当前步骤， 起始为0。</td>
          <td>Number | String</td>
          <td>0</td>
        </tr>
        <tr>
          <td>status</td>
          <td>当前步骤状态， 可选值：'wait', 'process', 'finish', 'error'。</td>
          <td>String</td>
          <td>process</td>
        </tr>
        <tr>
          <td>size</td>
          <td>尺寸，可选值：'small', 'default'。</td>
          <td>String</td>
          <td>default</td>
        </tr>
        <tr>
          <td>progress-dot</td>
          <td>是否以圆点显示步骤。</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
      </tbody>
    </table>
    <table class="api-table">
      <caption>UxStep Props</caption>
      <thead>
        <tr>
          <th>属性</th>
          <th>描述</th>
          <th>类型</th>
          <th>默认值</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>icon</td>
          <td>图标名称，最终类名为`${icon-prefx} ${icon-prefix}-${icon}`。</td>
          <td>String</td>
          <td>-</td>
        </tr>
        <tr>
          <td>title</td>
          <td>步骤标题</td>
          <td>String</td>
          <td>-</td>
        </tr>
        <tr>
          <td>desc</td>
          <td>步骤描述</td>
          <td>String</td>
          <td>-</td>
        </tr>
      </tbody>
    </table>
    <table class="api-table">
      <caption>UxStep Slots</caption>
      <thead>
        <tr>
          <th>名称</th>
          <th>描述</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>icon</td>
          <td>步骤图标， 会覆盖icon属性设置</td>
        </tr>
        <tr>
          <td>title</td>
          <td>步骤标题, 会覆盖title属性设置</td>
        </tr>
        <tr>
          <td>desc</td>
          <td>步骤描述， 会覆盖desc属性设置</td>
        </tr>
      </tbody>
    </table>
  </article>
</template>

<script>
  import demoBasic from './basic.vue';
  import demoVertical from './vertical.vue';
  import demoIcon from './icon.vue';
  import demoChange from './change.vue';
  import demoSmall from './small.vue';
  import demoError from './error.vue';
  import demoDot from './dot.vue';

  export default {
    components: {
      demoBasic,
      demoVertical,
      demoIcon,
      demoChange,
      demoSmall,
      demoError,
      demoDot,
    },
  };
</script>
