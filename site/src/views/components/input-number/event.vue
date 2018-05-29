<template>
  <ux-demo title="事件"
           :height="200">
    <div slot="demo">
      <ux-input-number v-model="num"
                       @input="onInput"
                       @change="onChange"
                       @keypress="onKeypress"
                       @focus="onFocus"
                       @blur="onBlur" />
    </div>
    <div slot="desc">
      可以打开控制台查看事件。
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/input-number/event.vue';

  export default {
    data() {
      return {
        code,
        num: 5,
      };
    },
    methods: {
      onChange(val, prevVal) {
        console.log('onChange', val, prevVal);
      },
      onInput(val) {
        console.log('onInput', val);
      },
      onFocus(e) {
        console.log('onFocus', e);
      },
      onBlur(e) {
        console.log('onBlur', e);
      },
      onKeypress(e) {
        console.log('onKeypress', e);
      },
    },
  };
</script>

