<template>
  <div class="demo">
    <h6>disable hours</h6>
    <ux-timepicker :disabled-hours="disabledHours" />
    <h6>disable minutes</h6>
    <ux-timepicker :disabled-minutes="disabledMinutes" />
    <h6>disable seconds</h6>
    <ux-timepicker :disabled-seconds="disabledSeconds" />
  </div>
</template>


<script>
  import { Timepicker } from '@suning/uxcool';

  export default {
    components: {
      UxTimepicker: Timepicker,
    },
    data() {
      return {
        value: new Date(2018, 7, 20, 0, 45, 25),
      };
    },
    methods: {
      disabledHours() {
        return [10, 20, '15'];
      },
      disabledMinutes(hour) {
        return hour === 18 ? [1, 5, 17, 12, '58'] : [];
      },
      disabledSeconds(hour, minute) {
        return hour === 19 && minute === 50 ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 20] : [];
      },
    },
  };
</script>
