<template>
  <div>
    <h3>show-date-input</h3>
    <p>show-date-input: true</p>
    <ux-multi-date-picker v-model="val"
                          show-date-input
    />
    <p>show-date-input: false</p>
    <ux-multi-date-picker v-model="val"
                          :show-date-input="false"
    />
  </div>
</template>

<script>
  import { Datepicker } from '@suning/uxcool';

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
