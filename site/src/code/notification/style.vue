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
          duration: 0,
          style: {
            width: '500px',
            marginLeft: `${384 - 500}px`,
          },
          className: 'custom-class',
        });
      },
    },
  };
</script>

