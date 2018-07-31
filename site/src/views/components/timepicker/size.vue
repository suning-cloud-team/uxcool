<template>
  <ux-demo :height="200"
           title="大小">
    <div slot="demo">
      <ux-timepicker v-model="value"
                     size="small" /> <br><br>
      <ux-timepicker v-model="value" />
      <br><br>
      <ux-timepicker v-model="value"
                     size="large" />
    </div>
    <div slot="desc">
      使用
      <code>size</code>属性,设置元素大小
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/timepicker/size.vue';

  export default {
    data() {
      return {
        code,
        value: new Date(2018, 7, 20, 0, 45, 25),
      };
    },
  };
</script>

