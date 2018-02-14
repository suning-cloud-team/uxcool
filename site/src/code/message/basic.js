export default `
<template>
  <ux-button theme="primary"
    @click="info">普通提示</ux-button>
</template>

<script>
  import UxMessage from '@suning/uxcool/es/message';

  export default {
    methods: {
      info() {
        UxMessage.info('This is info message');
      },
    },
  };
</script>
`;
