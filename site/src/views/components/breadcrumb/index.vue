<template>
  <article class="doc">
    <h1 class="ux-heading">Breadcrumb
      <span class="subtitle">面包屑</span>
    </h1>
    <demo-basic></demo-basic>
    <demo-link></demo-link>
    <demo-router-link></demo-router-link>
    <demo-custom-icon></demo-custom-icon>
    <demo-custom-separator></demo-custom-separator>

    <hr>

    <ux-heading level="2"
                id="api">API</ux-heading>

    <table class="ux-table ux-table-striped-vertical api-table">
      <caption>UxBreadcrumb Props</caption>
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
          <td>separator</td>
          <td>分隔符</td>
          <td>String|Function=&gt;(VNode|String)</td>
          <td>'>'</td>
        </tr>
        <tr>
          <td>theme</td>
          <td>主题</td>
          <td>light|dark</td>
          <td>light</td>
        </tr>
      </tbody>
    </table>

    <table class="ux-table ux-table-striped-vertical api-table">
      <caption>UxBreadcrumbItem Props</caption>
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
          <td>href</td>
          <td>链接</td>
          <td>String</td>
          <td></td>
        </tr>
      </tbody>
    </table>

  </article>
</template>

<script>
  import DemoBasic from './basic.vue';
  import DemoLink from './link.vue';
  import DemoRouterLink from './routerLink.vue';
  import DemoCustomIcon from './customIcon.vue';
  import DemoCustomSeparator from './customSeparator.vue';

  export default {
    components: {
      DemoBasic,
      DemoLink,
      DemoRouterLink,
      DemoCustomIcon,
      DemoCustomSeparator,
    },
  };
</script>
