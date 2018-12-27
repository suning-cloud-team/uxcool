<template>
  <div class="demo">
    <h6>ok confirm</h6>

    <ux-date-picker ok-confirm
                    show-time
                    @change="onChange" />
    <br>
    <ux-range-date-picker ok-confirm
                          @calendar-change="onCalendarChange"
                          @change="onChange" />
    <br>
    <ux-range-date-picker :ranges="ranges"
                          ok-confirm
                          show-ok
                          @change="onChange" />
    <br>
    <ux-range-date-picker :ranges="ranges"
                          ok-confirm
                          show-time
                          @change="onChange" />
    <br>
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
  import { Datepicker } from '@suning/uxcool';

  export default {
    components: {
      UxDatePicker: Datepicker,
      UxRangeDatePicker: Datepicker.Range,
    },
    data() {
      return {
        ranges: {
          最近30分钟: () => [subMinutes(new Date(), 30), new Date()],
          今天: [new Date(), new Date()],
          昨天: [subDays(new Date(), 1), subDays(new Date(), 1)],
          最近一周: [subWeeks(new Date(), 1), new Date()],
          最近一月: [subMonths(new Date(), 1), new Date()],
          当月: [startOfMonth(new Date()), endOfMonth(new Date())],
          未来一月: [new Date(), addMonths(new Date(), 1)],
        },
      };
    },
    methods: {
      onChange(...args) {
        console.log('onChange', ...args);
      },
      onCalendarChange(...args) {
        console.log('onCalendarChange', ...args);
      },
    },
  };
</script>
