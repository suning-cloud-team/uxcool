<template>
  <ux-rate :value="3"
           allow-half
           @change="onChange"
           @focus="onFocus"
           @blur="onBlur"
           @hover-change="onHoverChange" />
</template>

<script>
  export default {
    methods: {
      onChange(...args) {
        console.log('onChange', ...args);
      },
      onHoverChange(...args) {
        console.log('onHoverChange', ...args);
      },
      onFocus(...args) {
        console.log('onFocus', ...args);
      },
      onBlur(...args) {
        console.log('onBlur', ...args);
      },
    },
  };
</script>
