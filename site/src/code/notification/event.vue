<template>
  <ux-button @click="open">open notification</ux-button>
</template>

<script>
  import { UxNotification } from '@suning/uxcool';

  export default {
    methods: {
      open() {
        UxNotification.open({
          title: 'notification',
          description: 'this is description',
          onClose() {
            console.log('close notification');
          },
        });
      },
    },
  };
</script>

