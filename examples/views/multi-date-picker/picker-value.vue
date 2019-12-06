<template>
  <div>
    <h3>pickerValue</h3>
    <p>picker value: {{ pickerValue }}</p>
    <ux-button @click="change">change picker value</ux-button>
    <ux-multi-date-picker v-model="val"
                          :picker-value="pickerValue" />
  </div>
</template>

<script>
  import { Datepicker, Button } from '@suning/uxcool';
  import { addMonths } from 'date-fns';

  export default {
    components: {
      UxMultiDatePicker: Datepicker.Multi,
      UxButton: Button,
    },
    data() {
      return {
        val: null,
        pickerValue: null,
      };
    },
    methods: {
      change() {
        this.pickerValue = addMonths(new Date(), Math.floor(Math.random() * 10));
      },
    },
  };
</script>
