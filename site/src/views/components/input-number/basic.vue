<template>
  <ux-demo title="基本用法"
           :height="200">
    <div slot="demo">
      <ux-input-number :min="0"
                       :max="10"
                       @change="onChange"
                       class="mr-xs-2" />
      <ux-input-number novalidate
                       v-model="num"
                       :min="1"
                       :max="10"
                       @change="onChange" />
    </div>
    <div slot="desc">
      可以指定最大、最小值以及初始值。
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
        num: 1,
      };
    },
    methods: {
      onChange(val) {
        console.log('changed', val);
      },
    },
  };
</script>

