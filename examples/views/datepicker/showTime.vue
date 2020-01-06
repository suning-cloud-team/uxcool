<template>
  <div class="demo">
    <h4>show-time</h4>
    <ux-button @click="onClick">
      change show time
    </ux-button>
    <ux-date-picker :show-time="showTime" />
  </div>
</template>


<script>
  import { Datepicker, Button } from '@suning/uxcool';

  export default {
    components: {
      UxButton: Button,
      UxDatePicker: Datepicker,
    },
    data() {
      return {
        showTime: true,
      };
    },
    methods: {
      onClick() {
        this.showTime = !this.showTime;
      },
    },
  };
</script>
