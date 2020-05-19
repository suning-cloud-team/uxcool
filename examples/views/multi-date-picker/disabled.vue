<template>
  <div>
    <h3>disabled</h3>
    <p>value: {{ val }}</p>
    <ux-button @click="change">change disabled</ux-button>
    <ux-multi-date-picker v-model="val"
                          :disabled="disabled"
                          @change="onChange" />
  </div>
</template>

<script>
  import { Datepicker, Button } from '@cloud-sn/uxcool';

  export default {
    components: {
      UxMultiDatePicker: Datepicker.Multi,
      UxButton: Button,
    },
    data() {
      return {
        val: null,
        disabled: false,
      };
    },
    methods: {
      change() {
        const { disabled } = this;
        this.disabled = !disabled;
      },
      onChange(...args) {
        console.log('change', ...args);
      },
    },
  };
</script>
