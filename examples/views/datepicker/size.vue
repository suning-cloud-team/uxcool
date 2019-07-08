<template>
  <div class="demo">
    <h4>size</h4>
    <ux-radio-group v-model="size">
      <ux-radio-button value="large">Large</ux-radio-button>
      <ux-radio-button value="default">default</ux-radio-button>
      <ux-radio-button value="small">small</ux-radio-button>
    </ux-radio-group>
    <div>
      <ux-date-picker :size="size"
                      class="my-xs-1" />
      <br>
      <ux-month-picker :size="size"
                       class="my-xs-1" />
      <br>
      <ux-range-date-picker :size="size"
                            class="my-xs-1" />
    </div>
  </div>
</template>


<script>
  import { Datepicker, Radio } from '@suning/uxcool';

  export default {
    components: {
      UxDatePicker: Datepicker,
      UxMonthPicker: Datepicker.Month,
      UxRangeDatePicker: Datepicker.Range,
      UxRadioGroup: Radio.Group,
      UxRadioButton: Radio.Button,
    },
    data() {
      return {
        size: 'default',
      };
    },
    methods: {},
  };
</script>
