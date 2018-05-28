<template>
  <ux-demo title="步长"
           :height="200">
    <div slot="demo">
      <ux-input-number novalidate
                       :value="num"
                       :step="0.1"
                       :min="min"
                       :max="max"
                       name="abc"
                       class="mr-xs-2" />
      <ux-input-number novalidate
                       :value="num"
                       :step="0.2"
                       :min="min"
                       :max="max"
                       name="def" />
    </div>
    <div slot="desc">
      可以通过
      <code>step</code> 指定步长。
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/input-number/step.vue';

  export default {
    data() {
      return {
        code,
        num: 1,
        min: 1,
        max: 10,
      };
    },
  };
</script>

