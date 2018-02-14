export default `
<template>
  <ux-button @click="info">显示10秒</ux-button>
</template>

<script>
  import UxMessage from '@suning/uxcool/es/message';

  export default {
    methods: {
      info() {
        UxMessage.info({ content: '10秒后消失', duration: 10000 });
      },
    },
  };
</script>
`;
