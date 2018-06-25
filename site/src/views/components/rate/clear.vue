<template>
  <ux-demo :height="200"
           title="点击清除">
    <div slot="demo">
      <ux-rate :value="3"
               :allow-clear="false" />
      <span>allow-clear: false</span>
      <br>
      <ux-rate :value="2" />
      <span>allow-clear: true</span>
    </div>
    <div slot="desc">
      允许点击清除
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/rate/clear.vue';

  export default {
    data() {
      return {
        code,
      };
    },
  };
</script>

