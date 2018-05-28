<template>
  <ux-input-number v-model="num"
                   @input="onInput"
                   @change="onChange"
                   @keypress="onKeypress"
                   @focus="onFocus"
                   @blur="onBlur" />
</template>

<script>
  export default {
    data() {
      return {
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
