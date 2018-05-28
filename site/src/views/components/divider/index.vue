<template>
  <article class="doc">
    <h1 class="ux-heading">Divider
      <span class="subtitle">分割线</span>
    </h1>

    <demo-horizontal />
    <demo-vertical />
    <hr>
    <ux-heading level="2"
                id="api">API</ux-heading>

    <table class="api-table">
      <caption>UxDivider Props</caption>
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
          <td>分割线类型，可选值：
            <code>horizontal</code>、
            <code>vertical</code>
          </td>
          <td>String</td>
          <td>
            <code>horizontal</code>
          </td>
        </tr>
        <tr>
          <td>dashed</td>
          <td>是否是虚线</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>orientation</td>
          <td>分割线文字位置，可选值:
            <code>left</code>、
            <code>right</code>
          </td>
          <td>String</td>
          <td>''</td>
        </tr>
      </tbody>
    </table>
  </article>
</template>

<script>
  import demoHorizontal from './horizontal.vue';
  import demoVertical from './vertical.vue';

  export default {
    components: {
      demoHorizontal,
      demoVertical,
    },
  };
</script>
