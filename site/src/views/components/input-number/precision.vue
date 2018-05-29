<template>
  <ux-demo title="精度"
           :height="200">
    <div slot="demo">
      <ux-input-number novalidate
                       :value="num"
                       :min="0"
                       :max="10"
                       :precision="1"
                       class="mr-xs-2" />
      <ux-input-number novalidate
                       :value="num"
                       :min="0"
                       :max="10"
                       :precision="2" />
    </div>
    <div slot="desc">
      可以通过
      <code>precision</code> 指定精度。
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/input-number/precision.vue';

  export default {
    data() {
      return {
        code,
        num: 1,
      };
    },
  };
</script>

