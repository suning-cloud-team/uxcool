<template>
  <div class="demo">
    <h6>placement</h6>
    <ux-button @click="changePlacement('topRight')">topRight</ux-button>
    <ux-button @click="changePlacement('topLeft')">topLeft</ux-button>
    <ux-button @click="changePlacement('bottomRight')">bottomRight</ux-button>
    <ux-button @click="changePlacement('bottomLeft')">bottomLeft</ux-button>
    <br>
    <br>
    <ux-date-picker :placement="placement"
                    ok-confirm
                    show-time
                    @change="onChange" />
    <br>
    <br>
    <ux-range-date-picker :placement="placement"
                          ok-confirm
                          @calendar-change="onCalendarChange"
                          @change="onChange" />
    <br>
    <br>
    <slider-date-picker :date-picker-props="datePickerProps"
                        style="width:500px"
                        @change="onChange" />
    <br>

    <ux-month-picker :placement="placement" />
  </div>
</template>

<script>
  import { Datepicker, Button } from '@cloud-sn/uxcool';

  export default {
    components: {
      UxDatePicker: Datepicker,
      UxRangeDatePicker: Datepicker.Range,
      UxButton: Button,
      UxMonthPicker: Datepicker.Month,
      SliderDatePicker: Datepicker.Slider,
    },
    data() {
      return {
        placement: 'bottomRight',
        datePickerProps: {
          placement: 'bottomRight',
        },
      };
    },
    methods: {
      changePlacement(placement) {
        this.placement = placement;
        this.datePickerProps.placement = placement;
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
