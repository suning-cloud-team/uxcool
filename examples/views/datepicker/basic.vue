<template>
  <div>
    <div class="demo">
      <h6>showTime</h6>
      <ux-date-picker v-model="date"
                      :theme="theme"
                      :show-time="{hideDisabledOptions:true}"
                      format="YYYY/MM/DD HH:mm"
                      placeholder="Select Time"
                      @change="onChange"
                      @ok="onOk" />
      <br>
      <ux-range-date-picker v-model="date1"
                            :theme="theme"
                            :placeholder="['Start Time', ' End Time']"
                            :show-time="{showSecond: false}"
                            format="YYYY/MM/DD HH:mm"
                            @calendar-change="onCalendarChange"
                            @change="onChange"
                            @ok="onOk" />
    </div>
    <div class="demo">
      <h6>不可选</h6>
      <ux-date-picker :theme="theme"
                      :show-time="{hideDisabledOptions:false}"
                      :disabled-date="disabledDate"
                      :disabled-time="disabledTime" />
      <br>
      <ux-range-date-picker :theme="theme"
                            :show-time="{hideDisabledOptions:true}"
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
    <div class="demo">
      <h6>默认时间</h6>
      <ux-date-picker :show-time="{defaultValue: new Date(2019, 3, 4, 12)}" />
      <ux-range-date-picker :show-time="{defaultValue: [
                              new Date(2019, 3, 4, 0), new Date(2019, 3, 4, 23, 59,59)]}"
                            :theme="theme" />
    </div>
    <placement-demo />

    <popup-container-demo />
    <ok-confirm-demo />

    <control-mode-demo />
    <size-demo />

    <change-value-demo />
    <month-demo />
    <range-month-demo />
    <year-demo />
    <slider-demo />
    <week-demo />
    <show-time-demo />
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
  import { Datepicker } from '@cloud-sn/uxcool';
  import MonthDemo from './month.vue';
  import PopupContainerDemo from './popupContainer.vue';
  import OkConfirmDemo from './okConfirm.vue';
  import SliderDemo from './slider.vue';
  import ControlModeDemo from './controlMode.vue';
  import PlacementDemo from './placement.vue';
  import SizeDemo from './size.vue';
  import ChangeValueDemo from './changeSelectedValue.vue';
  import RangeMonthDemo from './rangeMonth.vue';
  import YearDemo from './year.vue';
  import WeekDemo from './week.vue';
  import showTimeDemo from './showTime.vue';

  export default {
    components: {
      UxDatePicker: Datepicker,
      UxRangeDatePicker: Datepicker.Range,
      MonthDemo,
      PopupContainerDemo,
      OkConfirmDemo,
      SliderDemo,
      ControlModeDemo,
      PlacementDemo,
      SizeDemo,
      ChangeValueDemo,
      RangeMonthDemo,
      YearDemo,
      WeekDemo,
      showTimeDemo,
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
