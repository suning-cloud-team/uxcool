<template>
  <div>
    <h1>Year Picker</h1>
    <div>
      <h3>events</h3>
      <ux-year-picker @change="onChange"
                      @panel-change="onPanelChange"
                      @open-change="onOpenChange" />
    </div>

    <div>
      <h3>v-model</h3>
      <div>year value: {{ yearVal }}</div>
      <ux-year-picker v-model="yearVal" />
    </div>
    <div>
      <h3>disabled</h3>
      <ux-year-picker disabled />
    </div>
    <div>
      <h3>format</h3>
      <ux-year-picker format="YY" />
    </div>
    <div>
      <h3>placement</h3>
      <ux-year-picker placement="topLeft" />
    </div>
    <div>
      <h3>getPopupContainer</h3>
      <div ref="wrapRef" />
      <ux-year-picker :get-popup-container="getPopupContainer" />
    </div>
    <div>
      <h3>disabled-year</h3>
      <ux-year-picker :disabled-year="disabledYear" />
    </div>
    <div>
      <h3>placeholder = "this is year placeholder"</h3>
      <ux-year-picker placeholder="this is year placeholder" />
    </div>
    <div>
      <h3>size</h3>
      <ux-year-picker size="large" />
      <ux-year-picker />
      <ux-year-picker size="small" />
    </div>
    <div>
      <h3>allow-clear=false</h3>
      <ux-year-picker :allow-clear="false" />
    </div>
    <div>
      <h3>locale</h3>
      <ux-year-picker :locale="locale" />
    </div>
  </div>
</template>


<script>
  import { isBefore, isAfter } from 'date-fns';
  import { Datepicker } from '@cloud-sn/uxcool';
  import localeEN from '@cloud-sn/uxcool/src/components/datepicker/locale/en_US.js';

  export default {
    components: {
      UxYearPicker: Datepicker.Year,
    },
    data() {
      return {
        locale: localeEN.lang,
        yearVal: null,
      };
    },
    methods: {
      disabledYear(year) {
        return isBefore(year, new Date(2017, 0, 1)) || isAfter(year, new Date(2021, 0, 1));
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
