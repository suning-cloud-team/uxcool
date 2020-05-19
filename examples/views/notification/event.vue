<template>
  <div>
    <h4>event</h4>
    <div class="demo">
      <ux-button @click="open">open notification</ux-button>
    </div>
  </div>
</template>


<script>
  import { Notification, Button } from '@cloud-sn/uxcool';

  export default {
    components: {
      UxButton: Button,
    },
    methods: {
      open() {
        Notification.open({
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
