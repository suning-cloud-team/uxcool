<template>
  <div>
    <h3>placeholder</h3>
    <p>placeholder: {{ placeholder }}</p>
    <ux-multi-date-picker v-model="val"
                          :placeholder="placeholder" />
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
        placeholder: 'this is placeholder',
      };
    },
  };
</script>
