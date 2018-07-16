<template>
  <div class="demo">
    <h4>step</h4>
    <ux-timepicker v-model="value"
                   :minute-step="15"
                   hour-step="2"
                   second-step="10" />
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
  };
</script>
