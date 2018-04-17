<template>
  <ux-demo title="基本用法"
           :height="200">
    <div slot="demo">
      <div class="demo">
        <ux-slider />
      </div>
      <div class="demo">
        <ux-slider range
                   :value="[20,30]" />
      </div>
    </div>
    <div slot="desc">
      Slider基本用法, 设置
      <code>range</code>属性,则渲染为多滑块
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/slider/basic.vue';

  export default {
    data() {
      return {
        code,
        v: 10,
      };
    },
  };
</script>
