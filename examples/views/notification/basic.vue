<template>
  <div>
    <!-- <ux-button @click="open">open notification</ux-button> -->

    <icon-demo />
    <type-demo />
    <custom-demo />
    <style-demo />
    <config-demo />
    <event-demo />
  </div>
</template>


<script>
  import { Notification, Button } from '@suning/uxcool';
  import IconDemo from './icon.vue';
  import TypeDemo from './type.vue';
  import CustomDemo from './custom.vue';
  import StyleDemo from './style.vue';
  import ConfigDemo from './config.vue';
  import EventDemo from './event.vue';

  export default {
    components: {
      UxButton: Button,
      IconDemo,
      TypeDemo,
      CustomDemo,
      StyleDemo,
      ConfigDemo,
      EventDemo,
    },
    methods: {
      open() {
        Notification.open({
          title: 'notification',
          description: 'this is description',
        });
      },
    },
  };
</script>
<style lang="scss" scoped>
  ::v-deep .ux-btn {
    margin: 10px 10px 0 0;
  }
</style>
