<template>
  <ux-demo title="垂直"
           :height="200">
    <div slot="demo"
         class="gutter-group">
      Text
      <ux-divider type="vertical" />
      <a href="#">link</a>
      <ux-divider type="vertical" />
      <a href="#">link</a>
    </div>
    <div slot="desc">可以使用
      <code>type=vertical</code> 设置垂直分割线。
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/divider/vertical.vue';

  export default {
    data() {
      return {
        code,
      };
    },
  };
</script>

