<template>
  <article class="doc">
    <h1 class="ux-heading">Spin
      <span class="subtitle">加载动画</span>
    </h1>
    <demo-basic></demo-basic>
    <demo-size></demo-size>
    <demo-custom></demo-custom>
    <demo-nest></demo-nest>
    <demo-switch></demo-switch>

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
          <td>prefix-cls</td>
          <td>spin组件类名</td>
          <td>String</td>
          <td>ux-spin</td>
        </tr>
        <tr>
          <td>size</td>
          <td>尺寸，可选值'small', 'large',不设置为默认大小。</td>
          <td>String</td>
          <td>-</td>
        </tr>
        <tr>
          <td>spinning</td>
          <td>是否显示加载中。</td>
          <td>Boolean</td>
          <td>true</td>
        </tr>
        <tr>
          <td>spin-class</td>
          <td>spin类名。</td>
          <td>String | Object</td>
          <td>-</td>
        </tr>
        <tr>
          <td>spin-style</td>
          <td>spin样式。</td>
          <td>String | Object</td>
          <td>-</td>
        </tr>
        <tr>
          <td>wrap-class</td>
          <td>容器类。</td>
          <td>String | Object</td>
          <td>-</td>
        </tr>
        <tr>
          <td>wrap-style</td>
          <td>容器样式。</td>
          <td>String | Object</td>
          <td>-</td>
        </tr>
        <tr>
          <td>tip</td>
          <td>文字提示。</td>
          <td>String</td>
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
          <td>tip</td>
          <td>自定义文字，会覆盖tip属性设置</td>
        </tr>
      </tbody>
    </table>
  </article>
</template>

<script>
  import demoBasic from './basic.vue';
  import demoSize from './size.vue';
  import demoCustom from './custom.vue';
  import demoNest from './nest.vue';
  import demoSwitch from './switch.vue';

  export default {
    components: {
      demoBasic,
      demoSize,
      demoCustom,
      demoNest,
      demoSwitch,
    },
  };
</script>
