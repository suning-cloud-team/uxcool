<template>
  <ux-demo :height="200"
           title="禁用">
    <div slot="demo">
      <ux-timepicker v-model="value"
                     disabled />
    </div>
    <div slot="desc">
      禁用组件
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/timepicker/disabled.vue';

  export default {
    data() {
      return {
        code,
        value: new Date(2018, 7, 20, 0, 45, 25),
      };
    },
  };
</script>
