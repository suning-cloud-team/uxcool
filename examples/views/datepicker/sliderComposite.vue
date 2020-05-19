<template>
  <div>
    <ux-button :class="$style.btn"
               @click="onChangeRefreshValue">change refresh-value: {{ refreshValue }}</ux-button>
    <ux-button :class="$style.btn"
               @click="onChangeDisabled">change disabled: {{ disabled }}</ux-button>
    <ux-button :class="$style.btn"
               @click="onChangeForceRefresh">change force-refresh: {{ forceRefresh }}</ux-button>
    <ux-button :class="$style.btn"
               @click="onChangeRefreshTimes">change refrsh-times</ux-button>
    <ux-button :class="$style.btn"
               @click="onChangeShowSliderBar">change show-slider-bar:{{ showSliderBar }}</ux-button>
    <ux-button :class="$style.btn"
               @click="onChangeShowRefreshBar">change show-refresh-bar:{{ showRefreshBar }}</ux-button>
    <div>slider value: {{ value }}</div>
    <ux-slider-date-picker v-model="value"
                           :disabled="disabled"
                           :refresh-value="refreshValue"
                           :force-refresh="forceRefresh"
                           :ranges="refreshRanges"
                           :refresh-times="refreshTimes"
                           :show-slider-bar="showSliderBar"
                           :show-refresh-bar="showRefreshBar"
                           style="width:500px"
                           allow-clear
                           @interval-refresh="onIntervalRefresh"
                           @manual-refresh="onManualRefresh" />
  </div>
</template>

<script>
  import { subDays, subSeconds, startOfDay, endOfDay } from 'date-fns';
  import { Button, Datepicker } from '@cloud-sn/uxcool';

  export default {
    components: {
      UxButton: Button,
      UxSliderDatePicker: Datepicker.Slider,
    },
    data() {
      return {
        value: null,
        disabled: true,
        forceRefresh: false,
        showRefreshBar: true,
        showSliderBar: true,
        refreshValue: '5s',
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
            label: '昨天',
            duration: '1m',
            dates() {
              return [startOfDay(subDays(new Date(), 1)), endOfDay(subDays(new Date(), 1))];
            },
          },
        ],
        refreshTimes: [
          {
            value: '1h',
          },
          {
            value: '20s',
          },
          {
            value: '3s',
            label: '3s啊',
          },
          {
            value: '5s',
          },
          {
            value: '7s',
          },
        ],
      };
    },
    created() {
      this.originRefreshTimes = [];
    },
    methods: {
      onChangeRefreshValue() {
        const { refreshTimes } = this;
        const times = [{ value: 'REFRESH_OFF' }, ...refreshTimes];
        this.refreshValue = times[Math.floor(Math.random() * times.length)].value;
      },
      onChangeDisabled() {
        this.disabled = !this.disabled;
      },
      onChangeForceRefresh() {
        this.forceRefresh = !this.forceRefresh;
      },
      onChangeRefreshTimes() {
        const { originRefreshTimes, refreshTimes } = this;
        this.originRefreshTimes = refreshTimes;
        this.refreshTimes = originRefreshTimes;
      },
      onChangeShowSliderBar() {
        this.showSliderBar = !this.showSliderBar;
      },
      onChangeShowRefreshBar() {
        this.showRefreshBar = !this.showRefreshBar;
      },
      onManualRefresh(...args) {
        console.log('onManualRefresh', ...args);
      },
      onIntervalRefresh(...args) {
        console.log('onIntervalRefresh', ...args);
      },
    },
  };
</script>

<style module>
  .btn {
    margin: 10px 10px 10px 0px;
  }
</style>
