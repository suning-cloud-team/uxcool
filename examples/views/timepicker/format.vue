<template>
  <div class="demo">
    <h4>format</h4>
    <ux-timepicker :open-value="openValue"
                   format="H:m" />
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
        openValue: new Date(2018, 7, 20, 0, 45, 25),
      };
    },
  };
</script>
