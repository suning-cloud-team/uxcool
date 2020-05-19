<template>
  <div>
    <h4>config</h4>
    <div class="demo">
      <ux-button @click="setConfig">set config top=5, </ux-button>
      <ux-button @click="setConfig2">set config placement=bottomLeft, </ux-button>
      <ux-button @click="setConfig3">
        set config placement=bottomRight, getContainer= noticeWrapRef
      </ux-button>
      <ux-button @click="open">open global config notification</ux-button>

      <div ref="noticeWrapRef" />
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
      setConfig() {
        Notification.config({
          top: 5,
        });
      },
      setConfig2() {
        Notification.config({
          placement: 'bottomLeft',
        });
      },

      setConfig3() {
        const { $refs } = this;
        Notification.config({
          placement: 'bottomRight',
          getContainer() {
            return $refs.noticeWrapRef;
          },
        });
      },

      open() {
        Notification.open({
          title: 'notification',
          description: 'this is description',
        });
      },
    },
  };
</script>
