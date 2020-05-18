<template>
  <div class="demo">
    <h4>value</h4>
    <ux-timepicker v-model="value" />
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
    created() {
      setTimeout(() => {
        this.value = new Date(2018, 7, 20, 17, 15, 12);
      }, 1500);
    },
  };
</script>
