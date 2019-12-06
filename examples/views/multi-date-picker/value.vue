<template>
  <div>
    <h3>value</h3>
    <p>value: {{ val }}</p>
    <ux-button @click="change">change value</ux-button>
    <ux-multi-date-picker v-model="val"
                          @change="onChange" />
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
      };
    },
    methods: {
      change() {
        const seed = Math.floor(Math.random() * 5);
        this.val = Array(seed)
          .fill(0)
          .map((_, i) => addMonths(new Date(), i));
      },
      onChange(...args) {
        console.log('change', ...args);
      },
    },
  };
</script>
