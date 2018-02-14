<template>
  <article class="doc">
    <h1 class="ux-heading">Badge
      <span class="subtitle">徽章</span>
    </h1>
    <demo-basic></demo-basic>
    <demo-dot></demo-dot>
    <demo-status></demo-status>
    <demo-custom></demo-custom>

    <hr>
    <ux-heading level="2"
                id="api">API</ux-heading>
    <table class="ux-table ux-table-striped-vertical api-table">
      <caption>Props</caption>
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
          <td>徽章类名</td>
          <td>String</td>
          <td>ux-badge</td>
        </tr>
        <tr>
          <td>scroll-number-prefix-cls</td>
          <td>徽章数字类名</td>
          <td>String</td>
          <td>ux-scroll-number</td>
        </tr>
        <tr>
          <td>count</td>
          <td>数字</td>
          <td>Number | String</td>
          <td>-</td>
        </tr>
        <tr>
          <td>show-zero</td>
          <td>数字是0时是否显示徽章</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>overflow-count</td>
          <td>显示数字的上限。当count超出overflowCount时，会显示为`${overflowCount}+`。</td>
          <td>Number | String</td>
          <td>99</td>
        </tr>
        <tr>
          <td>dot</td>
          <td>圆点模式</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>custom-style</td>
          <td>徽章数字自定义样式</td>
          <td>Object</td>
          <td>-</td>
        </tr>
        <tr>
          <td>status</td>
          <td>状态，可选值为'success', 'processing', 'default', 'error', 'warning'。</td>
          <td>String</td>
          <td>-</td>
        </tr>
        <tr>
          <td>text</td>
          <td>徽章文字，主要使用在徽章作为状态标记场景。</td>
          <td>String</td>
          <td>-</td>
        </tr>
      </tbody>
    </table>
  </article>
</template>

<style lang="scss">
  .demo-badge-group {
    margin-bottom: 20px;

    .ux-badge + .ux-badge {
      margin-left: 20px;
    }
  }

  .demo-badge {
    display: inline-block;
    width: 50px;
    height: 50px;
    background: #eee;

    .ux-badge-dark & {
      background: rgba(0, 0, 0, 0.2);
    }
  }
</style>


<script>
  import demoDot from './dot.vue';
  import demoBasic from './basic.vue';
  import demoStatus from './status.vue';
  import demoCustom from './custom.vue';

  export default {
    components: {
      demoBasic,
      demoDot,
      demoStatus,
      demoCustom,
    },
  };
</script>
