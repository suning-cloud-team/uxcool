<template>
  <article class="doc">
    <h1 class="ux-heading">Progress
      <span class="subtitle">进度条</span>
    </h1>

    <demo-basic></demo-basic>
    <demo-custom></demo-custom>

    <hr>

    <ux-heading level="2"
                id="api">API</ux-heading>
    <table class="api-table">
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
          <td>status</td>
          <td>状态，可选值：'default', 'success', 'error'</td>
          <td>String</td>
          <td>'default'</td>
        </tr>
        <tr>
          <td>hide-info</td>
          <td>是否隐藏信息。</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>percentage</td>
          <td>百分比</td>
          <td>String | Number</td>
          <td>0</td>
        </tr>
        <tr>
          <td>stroke-width</td>
          <td>进度条宽度。</td>
          <td>String | Number</td>
          <td>10</td>
        </tr>
      </tbody>
    </table>
  </article>
</template>

<script>
  import demoBasic from './basic.vue';
  import demoCustom from './custom.vue';

  export default {
    components: {
      demoBasic,
      demoCustom,
    },
  };
</script>
