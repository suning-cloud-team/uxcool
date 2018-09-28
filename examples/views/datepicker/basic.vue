<template>
  <div>
    <button class="ux-btn"
            @click="changeTheme">
      {{ theme }}
    </button>
    <!-- <div class="demo">
      <ux-date-picker :theme="theme"
                      @change="onChange" />
      <br> {{ date1 }}
      <ux-range-date-picker v-model="date1"
                            :theme="theme"
                            :open-value="openValue"
                            @calendar-change="onCalendarChange"
                            @change="onChange" />
    </div>

    <div class="demo">
      <h6>快捷选择</h6>
      <ux-range-date-picker :ranges="ranges"
                            :theme="theme" />
      <br>
      <ux-range-date-picker :ranges="ranges"
                            :theme="theme"
                            show-today
                            show-time />
    </div>

    <div class="demo">
      <h6>格式</h6>
      <ux-date-picker :theme="theme"
                      format="YYYY/MM/DD"
                      show-today />
      <br>
      <ux-range-date-picker :theme="theme"
                            format="YYYY/MM/DD" />
    </div> -->
    <div class="demo">
      <h6>showTime</h6>
      <ux-date-picker :theme="theme"
                      v-model="date"
                      show-time
                      format="YYYY/MM/DD HH:mm"
                      placeholder="Select Time"
                      @change="onChange"
                      @ok="onOk" />
      <br>
      <ux-range-date-picker :theme="theme"
                            v-model="date1"
                            :placeholder="['Start Time', ' End Time']"
                            format="YYYY/MM/DD HH:mm"
                            show-time
                            @calendar-change="onCalendarChange"
                            @change="onChange"
                            @ok="onOk" />
    </div>
    <!-- <div class="demo">
      <h6>不可选</h6>
      <ux-date-picker :theme="theme"
                      :disabled-date="disabledDate"
                      :disabled-time="disabledTime" />
      <br>
      <ux-range-date-picker :theme="theme"
                            :disabled-date="disabledDate"
                            :disabled-time="disabledRangeTime" />
    </div>

    <div class="demo">
      <h6>禁用</h6>
      <ux-date-picker :theme="theme"
                      disabled />
      <br>
      <ux-range-date-picker :theme="theme"
                            disabled />
    </div>
    <div class="demo">
      <h6>v-model</h6>
      date: {{ date }} <br> rangeDate: {{ rangeDate }}
      <br>
      <ux-date-picker v-model="date"
                      :theme="theme" />
      <br>
      <ux-range-date-picker v-model="rangeDate"
                            :theme="theme" />
    </div>

    <month-demo />
    <popup-container-demo />
    <ok-confirm-demo /> -->
  </div>
</template>

<script>
  import {
    startOfDay,
    subDays,
    isBefore,
    subWeeks,
    subMonths,
    subMinutes,
    startOfMonth,
    endOfMonth,
    addMonths,
  } from 'date-fns';
  import { Datepicker } from '@suning/uxcool';
  import MonthDemo from './month.vue';
  import PopupContainerDemo from './popupContainer.vue';
  import OkConfirmDemo from './okConfirm.vue';

  export default {
    components: {
      UxDatePicker: Datepicker,
      UxRangeDatePicker: Datepicker.Range,
      MonthDemo,
      PopupContainerDemo,
      OkConfirmDemo,
    },
    data() {
      return {
        theme: 'light',
        date: null,
        date1: [],
        rangeDate: [new Date(), addMonths(new Date(), 3)],
        ranges: {
          最近30分钟: () => [subMinutes(new Date(), 30), new Date()],
          今天: [new Date(), new Date()],
          昨天: [subDays(new Date(), 1), subDays(new Date(), 1)],
          最近一周: [subWeeks(new Date(), 1), new Date()],
          最近一月: [subMonths(new Date(), 1), new Date()],
          当月: [startOfMonth(new Date()), endOfMonth(new Date())],
          未来一月: [new Date(), addMonths(new Date(), 1)],
        },
        openValue: [subMonths(new Date(), 1), addMonths(new Date(), 1)],
      };
    },
    methods: {
      changeTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
      },
      onCalendarChange(val) {
        console.log('onCalendarChange', val);
      },
      onChange(e, dateString) {
        console.log('onChange', e, dateString);
      },
      onOk(e) {
        console.log('onOk', e);
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
  };
</script>
