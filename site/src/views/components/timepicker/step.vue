<template>
  <ux-demo :height="200"
           title="">
    <div slot="demo">
      <ux-timepicker v-model="value"
                     :minute-step="15"
                     hour-step="2"
                     second-step="10" />
    </div>
    <div slot="desc">
      使用
      <code>hour-step</code>,
      <code>second-step</code>,
      <code>minute-step</code>自定义时分秒的步长
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/timepicker/step.vue';

  export default {
    data() {
      return {
        code,
        value: new Date(2018, 7, 20, 0, 45, 25),
      };
    },
  };
</script>
