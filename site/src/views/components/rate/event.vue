<template>
  <ux-demo :height="200"
           title="事件">
    <div slot="demo">
      <ux-rate :value="3"
               allow-half
               @change="onChange"
               @focus="onFocus"
               @blur="onBlur"
               @hover-change="onHoverChange" />
    </div>
    <div slot="desc">
      触发事件
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/rate/event.vue';

  export default {
    data() {
      return {
        code,
      };
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
