<template>
  <div class="demo">
    <h6>change value</h6>
    <ux-button @click="onClick">change value</ux-button>
    <div>
      <ux-date-picker v-model="dateVal"
                      @change="onChange" />
    </div>
    <div>
      <ux-range-date-picker v-model="rangeDateVal"
                            @calendar-change="onCalendarChange"
                            @change="onChange" />
    </div>
  </div>
</template>

<script>
  import {
    subDays,
    subWeeks,
    subMonths,
    subMinutes,
    startOfMonth,
    endOfMonth,
    addMonths,
  } from 'date-fns';
  import { Datepicker, Button } from '@suning/uxcool';

  export default {
    components: {
      UxDatePicker: Datepicker,
      UxRangeDatePicker: Datepicker.Range,
      UxButton: Button,
    },
    data() {
      return {
        dateVal: null,
        rangeDateVal: null,
      };
    },
    created() {
      this.dateVal = new Date();
      this.rangeDateVal = [new Date(), new Date()];
    },
    methods: {
      onClick() {
        this.dateVal = addMonths(new Date(), 1);
        this.rangeDateVal = [addMonths(new Date(), 1), addMonths(new Date(), 2)];
      },
      onChange(...args) {
        console.log('onChange', ...args);
      },
      onCalendarChange(...args) {
        console.log('onCalendarChange', ...args);
      },
    },
  };
</script>
