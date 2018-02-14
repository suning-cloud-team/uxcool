<template>
  <div>
    <button class="ux-btn"
            @click="changeTheme">
      {{theme}}
    </button>
    <div class="demo">
      <ux-date-picker :theme="theme"></ux-date-picker>
      <br>
      <ux-range-date-picker :theme="theme"
                            @change="onChange"></ux-range-date-picker>
    </div>

    <div class="demo">
      <h6>快捷选择</h6>
      <ux-range-date-picker :ranges="ranges"
                            :theme="theme">
      </ux-range-date-picker>
      <br>
      <ux-range-date-picker :ranges="ranges"
                            :theme="theme"
                            show-today
                            show-time>
      </ux-range-date-picker>
    </div>

    <div class="demo">
      <h6>格式</h6>
      <ux-date-picker :theme="theme"
                      format="YYYY/MM/DD"></ux-date-picker>
      <br>
      <ux-range-date-picker :theme="theme"
                            format="YYYY/MM/DD"></ux-range-date-picker>
    </div>
    <div class="demo">
      <h6>showTime</h6>
      <ux-date-picker :theme="theme"
                      show-time
                      placeholder="Select Time"></ux-date-picker>
      <br>
      <ux-range-date-picker :theme="theme"
                            show-time
                            :placeholder="['Start Time', ' End Time']">
      </ux-range-date-picker>
    </div>
    <div class="demo">
      <h6>不可选</h6>
      <ux-date-picker :theme="theme"
                      :disabled-date="disabledDate"
                      :disabled-time="disabledTime">
      </ux-date-picker>
      <br>
      <ux-range-date-picker :theme="theme"
                            :disabled-date="disabledDate"
                            :disabled-time="disabledRangeTime">
      </ux-range-date-picker>
    </div>

    <div class="demo">
      <h6>禁用</h6>
      <ux-date-picker :theme="theme"
                      disabled>
      </ux-date-picker>
      <br>
      <ux-range-date-picker :theme="theme"
                            disabled>
      </ux-range-date-picker>

    </div>

  </div>
</template>

<script>
  import {
    startOfDay,
    subDays,
    isBefore,
    subWeeks,
    subMonths,
    startOfMonth,
    endOfMonth,
    addMonths,
  } from 'date-fns';
  import '../../../src/components/datepicker/style/index.scss';
  import { UxDatePicker, UxRangeDatePicker } from '../../../src/components/datepicker';

  export default {
    data() {
      return {
        theme: 'light',
        ranges: {
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
      changeTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
      },
      onChange(e) {
        console.log('onChange', e);
      },
      disabledDate(current) {
        return current && isBefore(current, startOfDay(subDays(new Date(), 3)));
      },
      disabledTime() {
        return {
          disabledHours() {
            return Array(20)
              .fill(0)
              .map((v, i) => i + 5);
          },
          disabledMinutes() {
            return Array(20)
              .fill(0)
              .map((v, i) => i + 10);
          },
          disabledSeconds() {
            return [25, 56];
          },
        };
      },
      disabledRangeTime(values, type) {
        if (type === 'start') {
          return {
            disabledHours() {
              return Array(20)
                .fill(0)
                .map((v, i) => i + 1);
            },
            disabledMinutes() {
              return Array(20)
                .fill(0)
                .map((v, i) => i + 2);
            },
            disabledSeconds() {
              return [20, 21];
            },
          };
        }
        return {
          disabledHours() {
            return Array(20)
              .fill(0)
              .map((v, i) => i + 5);
          },
          disabledMinutes() {
            return Array(20)
              .fill(0)
              .map((v, i) => i + 10);
          },
          disabledSeconds() {
            return [25, 56];
          },
        };
      },
    },
    components: {
      UxDatePicker,
      UxRangeDatePicker,
    },
  };
</script>
