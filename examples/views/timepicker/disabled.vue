<template>
  <div class="demo">
    <h4>disabled</h4>
    <ux-timepicker v-model="value"
                   disabled />
  </div>
</template>


<script>
  import { Timepicker } from '@cloud-sn/uxcool';

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
