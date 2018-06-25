<template>
  <ux-demo :height="200"
           title="禁用">
    <div slot="demo">
      <ux-rate :value="3"
               disabled/>
    </div>
    <div slot="desc">
      禁用
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/rate/disabled.vue';

  export default {
    data() {
      return {
        code,
      };
    },
  };
</script>

