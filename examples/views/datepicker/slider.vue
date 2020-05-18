<template>
  <div class="demo">
    <h1>Slider</h1>
    <div>

      getDateStr: {{ getDateStr() }}
      selectedValue: {{ selectedValue }}
      <slider-date-picker v-model="selectedValue"
                          :show-slider-bar="true"
                          :ranges="ranges"
                          :compatibility="true"
                          :date-picker-props="datePickerProps"
                          :date-picker-events="datePickerEvents"
                          allow-clear
                          style="width:500px"
                          @change="onChange" />

    </div>
    <div>
      <h4>slider hide second</h4>
      <slider-date-picker v-model="selectedValue"
                          :show-slider-bar="true"
                          :ranges="ranges"
                          :compatibility="true"
                          :date-picker-props="datePickerProps"
                          :date-picker-events="datePickerEvents"
                          :show-time="{showSecond:false}"
                          allow-clear
                          format="YYYY-MM-DD HH:mm"
                          style="width:500px"
                          @change="onChange" />
    </div>

    <div>
      <h4>refresh </h4>

      <slider-date-picker v-model="val2"
                          :ranges="refreshRanges"
                          :refresh-times="refreshTimes"
                          @interval-refresh="onRefresh" />
    </div>
    <div>
      <h4> force refresh </h4>
      <slider-date-picker v-model="val3"
                          :ranges="refreshRanges"
                          :refresh-times="refreshTimes"
                          force-refresh
                          allow-clear
                          @interval-refresh="onRefresh" />
    </div>
    <div>
      <h4> change times </h4>
      <div>refreshTimes : {{ refreshTimes1 }}</div>
      <ux-button @click="onChangeTimes">change times</ux-button>
      <slider-date-picker v-model="val4"
                          :ranges="refreshRanges"
                          :refresh-times="refreshTimes1"
                          @interval-refresh="onRefresh" />
    </div>

    <div>
      <h4>change refresh value</h4>
      <div>refreshValue: {{ refreshValue }}</div>
      <ux-button @click="onChangeRefreshValue">change refresh Value</ux-button>
      <slider-date-picker v-model="val5"
                          :ranges="refreshRanges"
                          :refresh-times="refreshTimes"
                          :refresh-value="refreshValue"
                          allow-clear
                          @interval-refresh="onRefresh"
                          @refresh-value-change="onRefreshValueChange"
                          @refresh-current-change="onRefreshCurrentChange"
                          @manual-refresh="onManualRefresh" />
    </div>
    <div>
      <h4>show refresh label</h4>
      <div>refreshValue1: {{ refreshValue1 }}</div>
      <ux-button @click="onChangeRefreshValue1">change refresh Value 1</ux-button>
      <slider-date-picker v-model="val6"
                          :ranges="refreshRanges"
                          :refresh-times="refreshTimes"
                          :refresh-value="refreshValue1"
                          style="width:500px"
                          @interval-refresh="onRefresh"
                          @refresh-value-change="onRefreshValue1Change"
                          @refresh-current-change="onRefreshCurrentChange">
        <div slot="renderRefreshLabel"
             slot-scope="{ option }"
             @click.stop.prevent="onManualCloseIntervalRefresh">
          hello : {{ option.label }}
        </div>
      </slider-date-picker>

    </div>
    <div>
      <h4> refresh change label</h4>
      <div>refreshValue1: {{ refreshValue1 }} val7: {{ val7 }}</div>
      <ux-button @click="onChangeTimes">change times</ux-button>
      <ux-button @click="onChangeRefreshValue1">change refresh Value 1</ux-button>
      <ux-button @click="onChangeDisabled">change disabled</ux-button>
      <slider-date-picker v-model="val7"
                          :ranges="refreshRanges"
                          :refresh-times="refreshTimes1"
                          :refresh-value="refreshValue1"
                          :disabled="disabled"
                          style="width:500px"
                          force-refresh
                          allow-clear
                          @interval-refresh="onRefresh"
                          @refresh-value-change="onRefreshValue1Change"
                          @refresh-current-change="onRefreshCurrentChange"
                          @manual-refresh="onManualRefresh" />
    </div>
    <div>
      <h4> refresh change label</h4>
      <div>refreshValue1: {{ refreshValue1 }} val8: {{ val8 }}</div>
      <ux-button @click="onChangeTimes">change times</ux-button>
      <ux-button @click="onChangeDisabled">change disabled</ux-button>
      <slider-date-picker v-model="val8"
                          :ranges="refreshRanges"
                          :refresh-times="refreshTimes1"
                          :refresh-value="refreshValue2"
                          :disabled="disabled"
                          style="width:500px"
                          force-refresh
                          allow-clear
                          @interval-refresh="onRefresh" />
    </div>

    <slider-composite-demo />
  </div>
</template>


<script>
  import {
    subMinutes, subHours, format as formatDate, subSeconds
  } from 'date-fns';
  import { Datepicker, Button } from '@cloud-sn/uxcool';
  import SliderCompositeDemo from './sliderComposite.vue';

  const minDate = subMinutes(new Date(), 1);
  export default {
    components: {
      SliderDatePicker: Datepicker.Slider,
      UxButton: Button,
      SliderCompositeDemo,
    },
    data() {
      return {
        // selectedValue: '最近1小时',
        // selectedValue: [subDays(new Date(), 20), new Date()],
        val2: '',
        val3: '',
        val4: '',
        val5: '',
        val6: '',
        val7: '',
        val8: '最近20秒',
        selectedValue: ['a'],
        ranges: [
          {
            label: '最近15分钟',
            duration: '15m',
            dates() {
              return [subMinutes(new Date(), 15), new Date()];
            },
          },
          {
            value: '最近1小时',
            label: '最近1小时啊',
            duration: '1h',
            dates() {
              return [subHours(new Date(), 1), new Date()];
            },
          },
        ],
        datePickerProps: {
          // showTime: false,
        },
        datePickerEvents: {},

        refreshRanges: [
          {
            label: '最近20秒',
            duration: '20s',
            isRefresh: true,
            dates() {
              return [subSeconds(new Date(), 20), new Date()];
            },
          },
          {
            label: '最近1分钟',
            duration: '1m',
            dates() {
              return [subMinutes(new Date(), 1), new Date()];
            },
          },
        ],
        refreshTimes: [
          {
            value: '1h',
          },
          { value: '+20s' },
          { value: '3s' },
          { value: '5s' },
          { value: '7s' },
          {
            value: 'ss',
          },
        ],
        refreshTimes1: [
          {
            value: '3s',
            label: '3s啊',
          },
          {
            value: '5s',
            label: '5s啊',
          },
          {
            value: '7s',
          },
        ],
        refreshValue: '3s',
        refreshValue1: 'REFRESH_OFF',
        refreshValue2: '3s',
        disabled: true,
      };
    },
    created() {
      const { onOpenChange, onCalendarChange } = this;
      this.datePickerEvents = {
        'open-change': onOpenChange,
        'calendar-change': onCalendarChange,
      };
      this.originRefreshTimes1 = [];
    },
    methods: {
      getDateStr() {
        const { selectedValue } = this;
        return formatDate(selectedValue[0], 'YYYY-MM-DD HH:mm:ss');
      },
      onChange(...args) {
        console.log('onChange', ...args);
      },
      minSliderDate() {
        return minDate;
      },
      onOpenChange(...args) {
        console.log('onOpenChange', ...args);
      },
      onCalendarChange(...args) {
        console.log('onCalendarChange', ...args);
      },
      onRefresh(...args) {
        console.log('onRefresh echo time %s', Date.now(), ...args);
      },
      onChangeTimes() {
        const { originRefreshTimes1, refreshTimes1 } = this;
        this.originRefreshTimes1 = refreshTimes1;
        this.refreshTimes1 = originRefreshTimes1;
      },
      onChangeRefreshValue() {
        const { refreshTimes } = this;
        this.refreshValue = refreshTimes[Math.floor(Math.random() * refreshTimes.length)].value;
      },
      onChangeRefreshValue1() {
        const { refreshTimes } = this;
        this.refreshValue1 = refreshTimes[Math.floor(Math.random() * refreshTimes.length)].value;
      },
      onRefreshValueChange(value) {
        this.refreshValue = value;
        console.log('onRefreshValueChange', value);
      },
      onRefreshValue1Change(value) {
        this.refreshValue1 = value;
        console.log('onRefreshValueChange1', value);
      },
      onRefreshCurrentChange(value) {
        console.log('onRefreshCurrentChange', value);
      },
      onManualCloseIntervalRefresh() {
        this.refreshValue1 = 'REFRESH_OFF';
        console.log('onManualCloseIntervalRefresh');
      },
      onManualRefresh(...args) {
        console.log('onManualRefresh echo time %s', Date.now(), ...args);
      },
      onChangeDisabled() {
        const { disabled } = this;
        this.disabled = !disabled;
      },
    },
  };
</script>
