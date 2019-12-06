<template>
  <div>
    <h3>allow clear</h3>
    <p>allow-clear: {{ allowClear }}</p>
    <ux-button @click="change">change allowClear</ux-button>
    <ux-multi-date-picker v-model="val"
                          :allow-clear="allowClear" />
  </div>
</template>

<script>
  import { Datepicker, Button } from '@suning/uxcool';

  export default {
    components: {
      UxMultiDatePicker: Datepicker.Multi,
      UxButton: Button,
    },
    data() {
      return {
        val: null,
        allowClear: true,
      };
    },
    methods: {
      change() {
        this.allowClear = !this.allowClear;
      },
    },
  };
</script>
