<template>
  <div>
    <ux-timepicker ref="timepickerRef"
                   :open-value="openValue"
                   :get-popup-container="getPopupContainer"
                   input-readonly
                   clear-text="clear all" />
    <button @click="focus">focus</button>
    <button @click="blur">blur</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
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
