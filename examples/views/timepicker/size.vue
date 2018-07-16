<template>
  <div class="demo">
    <h4>size</h4>
    <ux-timepicker v-model="value"
                   size="small" /> <br><br>
    <ux-timepicker v-model="value" />
    <br><br>
    <ux-timepicker v-model="value"
                   size="large" />
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
