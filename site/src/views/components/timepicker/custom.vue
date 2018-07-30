<template>
  <ux-demo :height="200"
           title="自定义容器">
    <div slot="demo">
      <div id="container" />
      <ux-timepicker ref="timepickerRef"
                     :open-value="openValue"
                     :get-popup-container="getPopupContainer"
                     input-readonly
                     clear-text="clear all" />
      <ux-button @click="focus">focus</ux-button>
      <ux-button @click="blur">blur</ux-button>
    </div>
    <div slot="desc">
      使用
      <code>get-popup-container</code>属性自定义容器
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/timepicker/custom.vue';

  export default {
    data() {
      return {
        code,
        openValue: new Date(2018, 7, 20, 0, 45, 25),
      };
    },
    methods: {
      getPopupContainer() {
        return document.querySelector('#container');
      },
      focus() {
        this.$refs.timepickerRef.focus();
      },
      blur() {
        this.$refs.timepickerRef.blur();
      },
    },
  };
</script>
