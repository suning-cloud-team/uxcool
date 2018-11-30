<template>
  <div class="demo">
    <h4>control mode</h4>
    <ux-date-picker v-model="dateValue"
                    :mode="dateMode"
                    control-mode
                    show-time
                    @panel-change="onPanelChange" />
    <ux-range-date-picker v-model="value"
                          :mode="mode"
                          format="YYYY-MM"
                          control-mode
                          show-time
                          @panel-change="onRangePanelChange" />
  </div>
</template>


<script>
  import { Datepicker } from '@suning/uxcool';

  export default {
    components: {
      UxDatePicker: Datepicker,
      UxMonthPicker: Datepicker.Month,
      UxRangeDatePicker: Datepicker.Range,
    },
    data() {
      return {
        dateValue: null,
        value: [],
        dateMode: 'year',
        mode: ['month', 'month'],
      };
    },
    methods: {
      onPanelChange(value, mode) {
        this.dateValue = value;
        console.log('mode', mode);
        // this.dateMode = mode;
        // this.dateMode = mode === 'date' ? 'month' : mode;
        this.dateMode = mode === 'year' || mode === 'decade' ? mode : 'year';
      },
      onRangePanelChange(value, mode) {
        console.log('onPanelChange', value);

        this.value = value;
        const [startMode, endMode] = mode;

        this.mode = [
          startMode === 'date' ? 'month' : startMode,
          endMode === 'date' ? 'month' : endMode,
        ];
        // this.mode = [
        //   startMode === 'year' || startMode === 'decade' ? startMode : 'year',
        //   endMode === 'year' || endMode === 'decade' ? endMode : 'year',
        // ];
        // this.value = value;
      },
    },
  };
</script>
