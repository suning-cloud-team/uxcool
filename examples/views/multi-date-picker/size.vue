<template>
  <div>
    <h3>size</h3>
    <ux-multi-date-picker v-model="val"
                          size="large" />
    <br>
    <ux-multi-date-picker v-model="val"
                          size="default" />
    <br>
    <ux-multi-date-picker v-model="val"
                          size="small" />
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
  };
</script>
