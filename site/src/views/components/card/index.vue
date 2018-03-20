<template>
  <article class="doc">
    <h1 class="ux-heading">Card
      <span class="subtitle">卡片</span>
    </h1>

    <ux-heading level="2"
                id="overview">概述</ux-heading>
    <p>聚合信息的一种容器，通常包含标题、内容和操作区域。</p>
    <demo-basic></demo-basic>
    <demo-flat></demo-flat>
    <demo-vertical></demo-vertical>

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
          <td>flat</td>
          <td>是否是纯色卡片</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>vertical</td>
          <td>是否是竖直卡片</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>bodyStyle</td>
          <td>卡片内容区样式</td>
          <td>Object</td>
          <td>-</td>
        </tr>
      </tbody>
    </table>
    <table class="api-table">
      <caption>Slots</caption>
      <thead>
        <tr>
          <th>名称</th>
          <th>描述</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>title</td>
          <td>卡片标题</td>
        </tr>
        <tr>
          <td>action</td>
          <td>操作，通常放一个
            <code>a</code>标签包裹的字体图标。</td>
        </tr>
        <tr>
          <td>无</td>
          <td>卡片内容</td>
        </tr>
      </tbody>
    </table>
  </article>
</template>

<script>
  import demoBasic from './basic.vue';
  import demoFlat from './flat.vue';
  import demoVertical from './vertical.vue';

  export default {
    components: {
      demoBasic,
      demoFlat,
      demoVertical,
    },
  };
</script>
