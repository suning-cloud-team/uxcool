<template>
  <div class="demo">
    <h1>Month Picker</h1>
    <div>
      <h3>events</h3>
      <ux-month-picker @panel-change="onPanelChange"
                       @open-change="onOpenChange"
                       @change="onChange" />
    </div>
    <div>
      <h3>locale en_US</h3>
      <ux-month-picker :locale="locale" />
    </div>
    <div>
      <h3>v-model</h3>
      <div>month value :{{ monthVal }}</div>
      <ux-month-picker v-model="monthVal" />
    </div>
    <div>
      <h3>disabled</h3>
      <ux-month-picker disabled />
    </div>
    <div>
      <h3>format = YYYY/MM</h3>
      <ux-month-picker format="YYYY/MM" />
    </div>
    <div>
      <h3>placement = topRight</h3>
      <ux-month-picker placement="topRight" />
    </div>
    <div>
      <h3>get-popup-container</h3>
      <div ref="wrapRef" />
      <ux-month-picker :get-popup-container="getPopupContainer" />
    </div>
    <div>
      <h3>disabled-month &lt; 2018-11 || &ge; 2020-06</h3>
      <ux-month-picker :disabled-month="disabledMonth" />
    </div>
    <div>
      <h3>placeholder = 'test placeholder'</h3>
      <ux-month-picker placeholder="test placeholder" />
    </div>
    <div>
      <h3>size</h3>
      <ux-month-picker size="large" />
      <ux-month-picker size="default" />
      <ux-month-picker size="small" />
    </div>
    <div>
      <h3>allow-clear = false</h3>
      <ux-month-picker :allow-clear="false" />
    </div>
  </div>
</template>


<script>
  import { isBefore, isAfter } from 'date-fns';
  import { Datepicker } from '@cloud-sn/uxcool';
  import localeEN from '@cloud-sn/uxcool/src/components/datepicker/locale/en_US.js';

  export default {
    components: {
      UxMonthPicker: Datepicker.Month,
    },
    data() {
      return {
        monthVal: null,
        locale: localeEN.lang,
      };
    },
    methods: {
      disabledMonth(month) {
        return isBefore(month, new Date(2018, 10, 1)) || isAfter(month, new Date(2020, 5, 1));
      },
      getPopupContainer() {
        return this.$refs.wrapRef;
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
    },
  };
</script>
