<template>
  <div>
    <h3>visible</h3>
    <p>visible: {{ visible }}</p>
    <ux-button @click.prevent="change">change value</ux-button>
    <ux-multi-date-picker v-model="val"
                          :visible.sync="visible" />
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
        visible: false,
      };
    },
    methods: {
      change() {
        this.visible = !this.visible;
      },
      onChange(...args) {
        console.log('change', ...args);
      },
    },
  };
</script>
