<template>
  <div class="demo">
    <h4>Slider</h4>
    getDateStr: {{ getDateStr() }}
    selectedValue: {{ selectedValue }}
    <slider-date-picker v-model="selectedValue"
                        :show-slider-bar="true"
                        :ranges="ranges"
                        :compatibility="true"
                        :date-picker-props="datePickerProps"
                        :min-slider-date="minSliderDate"
                        :show-time="{showSecond:false}"
                        format="YYYY-MM-DD HH:mm"
                        max-history-len="0"
                        style="width:500px"
                        @change="onChange" />
  </div>

</template>


<script>
  import { subMinutes, subHours, format as formatDate, subDays } from 'date-fns';
  import { Datepicker } from '@suning/uxcool';

  const minDate = subMinutes(new Date(), 1);
  export default {
    components: {
      SliderDatePicker: Datepicker.Slider,
    },
    data() {
      return {
        // selectedValue: '最近1小时',
        // selectedValue: [subDays(new Date(), 20), new Date()],
        selectedValue: [],
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
      };
    },
    created() {},
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
    },
  };
</script>
