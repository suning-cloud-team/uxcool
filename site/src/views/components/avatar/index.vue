<template>
  <article class="doc">
    <h1 class="ux-heading">Avatar
      <span class="subtitle">头像</span>
    </h1>
    <basic-demo/>
    <type-demo/>
    <scale-demo/>
    <badge-demo/>
    <hr>
    <ux-heading level="2"
                id="api">API</ux-heading>

    <table class="api-table">
      <caption>UxAvatar Props</caption>
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
          <td>size</td>
          <td>大小,可选值:
            <code>default</code>,
            <code>large</code>,
            <code>small</code>
          </td>
          <td>String</td>
          <td>default</td>
        </tr>
        <tr>
          <td>shape</td>
          <td>形状,可选值:
            <code>circle</code>,
            <code>square</code>
          </td>
          <td>String</td>
          <td>circle</td>
        </tr>
        <tr>
          <td>src</td>
          <td>头像图片 url</td>
          <td>String</td>
          <td></td>
        </tr>
        <tr>
          <td>icon</td>
          <td>头像 icon</td>
          <td>String</td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </article>
</template>

<script>
  import BasicDemo from './basic.vue';
  import TypeDemo from './type.vue';
  import ScaleDemo from './scale.vue';
  import BadgeDemo from './badge.vue';

  export default {
    components: {
      BasicDemo,
      TypeDemo,
      ScaleDemo,
      BadgeDemo,
    },
  };
</script>
