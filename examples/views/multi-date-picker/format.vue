<template>
  <div>
    <h3>format</h3>
    <ux-multi-date-picker v-model="val"
                          format="YYYY/MM/DD"
                          @change="onChange" />
  </div>
</template>

<script>
  import { Datepicker, Button } from '@cloud-sn/uxcool';

  export default {
    components: {
      UxMultiDatePicker: Datepicker.Multi,
    },
    data() {
      return {
        val: null,
        disalbed: false,
      };
    },
    methods: {
      onChange(...args) {
        console.log('change', ...args);
      },
    },
  };
</script>
