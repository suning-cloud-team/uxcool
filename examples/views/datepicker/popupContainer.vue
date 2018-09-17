<template>
  <div ref="demoRef"
       class="demo">
    <h4>getPopupContainer</h4>
    <h6>single</h6>
    <ux-date-picker :get-popup-container="getPopupContainer" />
    <h6>range</h6>
    <ux-range-date-picker :get-popup-container="getPopupContainer" />
  </div>
</template>


<script>
  import { Datepicker } from '@suning/uxcool';

  export default {
    components: {
      UxDatePicker: Datepicker,
      UxRangeDatePicker: Datepicker.Range,
    },
    methods: {
      getPopupContainer() {
        return this.$refs.demoRef;
      },
    },
  };
</script>
