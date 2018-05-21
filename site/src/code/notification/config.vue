<template>
  <div>
    <ux-button @click="setConfig">set config top=5, </ux-button>
    <ux-button @click="setConfig2">set config placement=bottomLeft, </ux-button>
    <ux-button @click="setConfig3">
      set config placement=bottomRight, getContainer= noticeWrapRef
    </ux-button>
    <br>
    <ux-button @click="open">open global config notification</ux-button>

    <div ref="noticeWrapRef" />
  </div>
</template>

<script>
  import { UxNotification } from '@suning/uxcool';

  export default {
    methods: {
      setConfig() {
        UxNotification.config({
          top: 5,
        });
      },
      setConfig2() {
        UxNotification.config({
          placement: 'bottomLeft',
        });
      },
      setConfig3() {
        const { $refs } = this;
        UxNotification.config({
          placement: 'bottomRight',
          getContainer() {
            return $refs.noticeWrapRef;
          },
        });
      },
      open() {
        UxNotification.open({
          title: 'notification',
          description: 'this is description',
        });
      },
    },
  };
</script>

