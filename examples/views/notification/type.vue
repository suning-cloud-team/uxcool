<template>
  <div>
    <h4>type</h4>
    <div class="demo">
      <ux-button @click="open('success')">open success notification</ux-button>
      <ux-button @click="open('info')">open info notification</ux-button>
      <ux-button @click="open('warn')">open warn notification</ux-button>
      <ux-button @click="open('warning')">open warn notification</ux-button>
      <ux-button @click="open('error')">open error notification</ux-button>
    </div>
  </div>
</template>


<script>
  import { Notification, Button } from '@cloud-sn/uxcool';
  import IconDemo from './icon.vue';

  export default {
    components: {
      UxButton: Button,
      IconDemo,
    },
    data() {
      return {
        placements: {
          error: 'topLeft',
          warning: 'bottomLeft',
          info: 'bottomRight',
        },
      };
    },
    methods: {
      open(type) {
        const { placements } = this;
        Notification[type]({
          title: 'notification',
          description: 'this is description',
          duration: type === 'error' ? 10000 : 4500,
          placement: type in placements ? placements[type] : 'topRight',
        });
      },
    },
  };
</script>
