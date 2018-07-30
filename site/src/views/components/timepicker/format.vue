<template>
  <ux-demo :height="200"
           title="格式化">
    <div slot="demo">
      <ux-timepicker :open-value="openValue"
                     format="H:m" />
    </div>
    <div slot="desc">
      使用
      <code>format</code>格式化时分秒
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/timepicker/format.vue';

  export default {
    data() {
      return {
        code,
        openValue: new Date(2018, 7, 20, 0, 45, 25),
      };
    },
  };
</script>
