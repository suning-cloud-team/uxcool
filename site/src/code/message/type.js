export default `
<template>
  <div>
    <ux-button theme="success"
      @click="success">成功</ux-button>
    <ux-button theme="danger"
      @click="error">失败</ux-button>
    <ux-button theme="warning"
      @click="warning">警告</ux-button>
  </div>
</template>

<script>
  import UxMessage from '@suning/uxcool/es/message';

  export default {
    methods: {
      success() {
        UxMessage.success({
          noticeStyle: {
            color: 'green',
          },
          content: 'This is success message',
          duration: 2500,
          onClose() {
            console.log('success on-close');
          },
        });
      },
      error() {
        UxMessage.error('This is error message');
      },
      warning() {
        UxMessage.warning('This is success message');
      },
    },
  };
</script>

`;
