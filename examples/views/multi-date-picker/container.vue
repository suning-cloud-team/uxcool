<template>
  <div>
    <h3>container</h3>
    <div ref="wrapRef" />
    <ux-multi-date-picker v-model="val"
                          :get-popup-container="getPopupContainer" />
  </div>
</template>

<script>
  import { Datepicker } from '@cloud-sn/uxcool';

  export default {
    components: {
      UxMultiDatePicker: Datepicker.Multi,
    },
    data() {
      return {
        val: null,
      };
    },
    methods: {
      getPopupContainer() {
        return this.$refs.wrapRef;
      },
    },
  };
</script>
