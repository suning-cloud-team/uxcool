<template>
  <ux-demo :height="200"
           title="基本">
    <div slot="demo">
      <ux-timepicker :open-value="openValue"
                     :allow-clear="false"
                     input-readonly />
    </div>
    <div slot="desc">
      使用
      <code>open-value</code>属性,定义面板展开时的默认值
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/timepicker/basic.vue';

  export default {
    data() {
      return {
        code,
        openValue: new Date(2018, 7, 20, 0, 45, 25),
      };
    },
  };
</script>
