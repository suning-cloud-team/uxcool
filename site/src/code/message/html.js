export default `
<template>
  <ux-button @click="info">使用HTML片段</ux-button>
</template>

<script>
  import UxMessage from '@suning/uxcool/es/essage';

  export default {
    methods: {
      info() {
        UxMessage.info({
          content: 'this is a <strong style="color: red;">html</strong> message',
          dangerouslySetInnerHTML: true,
        });
      },
    },
  };
</script>
`;
