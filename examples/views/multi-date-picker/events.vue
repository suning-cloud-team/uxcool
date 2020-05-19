<template>
  <div>
    <h3>Events</h3>
    <div>value: {{ val }}</div>
    <ux-multi-date-picker v-model="val"
                          @panel-change="onPanelChange"
                          @select="onSelect"
                          @unselect="onUnSelect"
                          @ok="onOk"
                          @change="onChange" />
  </div>
</template>

<script>
  import { Datepicker } from '@cloud-sn/uxcool';

  export default {
    components: {
      UxMultiDatePicker: Datepicker.Multi,
    },
    data() {
      return {
        val: null,
      };
    },
    methods: {
      onSelect(...args) {
        console.log('select', ...args);
      },
      onPanelChange(...args) {
        console.log('panel-change', ...args);
      },
      onUnSelect(...args) {
        console.log('unselect', ...args);
      },
      onOk(...args) {
        console.log('ok', ...args);
      },
      onChange(...args) {
        console.log('change', ...args);
      },
    },
  };
</script>
