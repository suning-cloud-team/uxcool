<template>
  <div>
    <h3>disabled Date</h3>
    <ux-button @click="change">change disabledDate function</ux-button>
    <ux-multi-date-picker v-model="val"
                          :disabled-date="disabledDate" />
  </div>
</template>

<script>
  import { Datepicker, Button } from '@cloud-sn/uxcool';
  import { isSameDay, subDays, isBefore } from 'date-fns';

  export default {
    components: {
      UxMultiDatePicker: Datepicker.Multi,
      UxButton: Button,
    },
    data() {
      return {
        val: [new Date(), subDays(new Date(), 1)],
        disabledDate: undefined,
      };
    },
    methods: {
      disabledToday(value) {
        return isSameDay(new Date(), value) || isBefore(value, subDays(new Date(), 3));
      },
      change() {
        const { disabledDate, disabledToday } = this;
        this.disabledDate = disabledDate ? undefined : disabledToday;
      },
    },
  };
</script>
