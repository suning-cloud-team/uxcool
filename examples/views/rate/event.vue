<template>
  <div class="demo">
    <h4>event</h4>
    <ux-rate :value="3"
             allow-half
             @change="onChange"
             @focus="onFocus"
             @blur="onBlur"
             @hover-change="onHoverChange" />
  </div>
</template>


<script>
  import { Rate } from '@cloud-sn/uxcool';

  export default {
    components: {
      UxRate: Rate,
    },
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
