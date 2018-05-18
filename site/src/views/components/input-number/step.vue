<template>
  <ux-demo title="步长"
           :height="200">
    <div slot="demo">
      <ux-input-number novalidate
                       :value="num1"
                       :step="0.1"
                       :min="min"
                       :max="max"
                       name="abc"
                       @change="onChange" /> {{ num1 }}
      <ux-input-number novalidate
                       v-model="num2"
                       :step="0.1"
                       :min="min"
                       :max="max"
                       name="abc"
                       @change="onChange" /> {{ num2 }}
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
  import code from '@/code/input-number/basic.vue';

  export default {
    data() {
      return {
        code,
        num1: 1,
        num2: 0,
        min: 1,
        max: 10,
      };
    },
    methods: {
      onChange(val) {
        console.log('changed', val);
      },
    },
  };
</script>

