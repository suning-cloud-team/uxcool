<template>
  <article class="doc">
    <h1 class="ux-heading">Anchor
      <span class="subtitle">锚点</span>
    </h1>

    <demo-basic />
    <demo-container />
    <demo-offset />

    <hr>
    <ux-heading level="2"
                id="api">API</ux-heading>
    <table class="api-table">
      <caption>UxAnchor Props</caption>
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
          <td>offsetTop</td>
          <td>距离顶部触发偏移量</td>
          <td>Number</td>
          <td>0</td>
        </tr>
        <tr>
          <td>bounds</td>
          <td>锚点区域边界 ,单位
            <code>px</code>
          </td>
          <td>Number</td>
          <td>5</td>
        </tr>
        <tr>
          <td>getContainer</td>
          <td>自定义容器</td>
          <td>Function=&gt;HTMLElement</td>
          <td>()=&gt;window</td>
        </tr>
      </tbody>
    </table>
    <table class="api-table">
      <caption>UxAnchorLink Props</caption>
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
          <td>title</td>
          <td>链接标题</td>
          <td>String</td>
          <td></td>
        </tr>
        <tr>
          <td>href</td>
          <td>锚点链接</td>
          <td>String</td>
          <td>#</td>
        </tr>
      </tbody>
    </table>

    <table class="api-table">
      <caption>UxAnchorLink Slots</caption>
      <thead>
        <tr>
          <th>名称</th>
          <th>描述</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>title</td>
          <td>自定义标题</td>
        </tr>
      </tbody>
    </table>

  </article>
</template>

<script>
  import demoBasic from './basic.vue';
  import demoContainer from './container.vue';
  import demoOffset from './offset.vue';

  export default {
    components: {
      demoBasic,
      demoContainer,
      demoOffset,
    },
  };
</script>
