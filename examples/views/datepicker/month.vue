<template>
  <div class="demo">
    <h4>mode = month 暂未支持</h4>
    <ux-range-date-picker :mode="['month','month']" />
  </div>
</template>


<script>
  import { Datepicker } from '@suning/uxcool';

  export default {
    components: {
      UxRangeDatePicker: Datepicker.Range,
    },
  };
</script>
