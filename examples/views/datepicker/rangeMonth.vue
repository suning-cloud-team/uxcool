<template>
  <div class="demo">
    <h1>Range Month</h1>
    <div>
      <h3>event</h3>
      <ux-range-month-picker @panel-change="onPanelChange"
                             @open-change="onOpenChange"
                             @hover-change="onHoverChange"
                             @calendar-change="onCalendarChange"
                             @change="onChange" />
    </div>
    <div>
      <h2>change value</h2>

      <ux-button @click="onChangeClick">Change Value</ux-button>
      <br>
      <ux-range-month-picker v-model="monthVal1" />
    </div>

    <div>
      <h2>disable month function</h2>
      <ux-range-month-picker v-model="monthVal2"
                             :disabled-month="disabledMonth" />

    </div>

    <div>
      <h2>disabled</h2>
      <ux-range-month-picker disabled />
    </div>
    <div>
      <h2>visible</h2>
      <ux-button @click="show">toggle visible : {{ visible }}</ux-button>
      <br>
      <ux-range-month-picker :visible="visible"
                             @open-change="onVisibleChange" />
    </div>
    <div>
      <h2>format='YYYY/MM'</h2>
      <ux-range-month-picker format="YYYY/MM" />
    </div>
    <div>
      <h2>placement=topRight</h2>
      <ux-range-month-picker placement="topRight" />
    </div>
    <div>
      <h2>placeholder=test placeholder</h2>
      <ux-range-month-picker placeholder="test placeholder" />
      <h2>placeholder=['test placeholder', 'test----ppp']</h2>
      <ux-range-month-picker :placeholder="['test placeholder', 'test----ppp']" />
    </div>
    <div>
      <h2>size</h2>
      <ux-range-month-picker size="large" />
      <br>
      <ux-range-month-picker size="default" />
      <br>
      <ux-range-month-picker size="small" />
    </div>

    <div>
      <h2>allowClear= false</h2>
      <ux-range-month-picker :allow-clear="false" />
    </div>

    <div>
      <h2>get-popup-container</h2>
      <div ref="popupRef" />
      <ux-range-month-picker :get-popup-container="getPopupContainer" />
    </div>

    <div>
      <h2>local en_US</h2>
      <div ref="popupRef" />
      <ux-range-month-picker :locale="locale" />
    </div>
  </div>
</template>


<script>
  import { Datepicker, Button } from '@cloud-sn/uxcool';
  import { subYears, addYears, isBefore, isAfter } from 'date-fns';
  import localeEN from '@cloud-sn/uxcool/src/components/datepicker/locale/en_US.js';

  export default {
    components: {
      UxButton: Button,
      UxRangeMonthPicker: Datepicker.RangeMonth,
    },
    data() {
      return {
        monthVal: [],
        monthVal1: [subYears(new Date(), 10), subYears(new Date(), 5)],
        monthVal2: [],
        visible: false,
        locale: localeEN.lang,
      };
    },
    created() {},
    methods: {
      show() {
        this.visible = !this.visible;
      },
      onVisibleChange(visible) {
        this.visible = visible;
      },
      getPopupContainer() {
        const { $refs } = this;
        return $refs.popupRef;
      },
      disabledMonth(month) {
        return isBefore(month, new Date(2017, 2, 1)) || isAfter(month, new Date(2023, 4, 1));
      },
      onChangeClick() {
        this.monthVal1 = [addYears(new Date(), 5), subYears(new Date(), 1)];
      },
      onPanelChange(...args) {
        console.log('panel-change', ...args);
      },
      onOpenChange(...args) {
        console.log('open-change', ...args);
      },
      onChange(...args) {
        console.log('change', ...args);
      },
      onHoverChange(...args) {
        console.log('hover-change', ...args);
      },
      onCalendarChange(...args) {
        console.log('calendar-change', ...args);
      },
    },
  };
</script>
