<template>
  <div :class="classes">
    <v-select v-if="hourSelect.show"
              :prefix-cls="prefixCls"
              :type="hourSelect.type"
              :list="hourSelect.list"
              :selected-index="hourSelect.selectedIndex"
              @on-select="hourSelect.onSelect">
    </v-select>
    <v-select v-if="minuteSelect.show"
              :prefix-cls="prefixCls"
              :type="minuteSelect.type"
              :list="minuteSelect.list"
              :selected-index="minuteSelect.selectedIndex"
              @on-select="minuteSelect.onSelect">
    </v-select>
    <v-select v-if="secondSelect.show"
              :prefix-cls="prefixCls"
              :type="secondSelect.type"
              :list="secondSelect.list"
              :selected-index="secondSelect.selectedIndex"
              @on-select="secondSelect.onSelect">
    </v-select>
  </div>
</template>


<script>
  import { getHours, getMinutes, getSeconds, setHours, setMinutes, setSeconds } from 'date-fns';
  import { leftPad } from '@cloud-sn/v-utils';
  import VSelect from './select.vue';

  export default {
    name: 'TimePickerCombobox',
    props: {
      prefixCls: String,
      value: { type: Date, required: true },
      format: String,
      showHour: Boolean,
      showMinute: Boolean,
      showSecond: Boolean,
      hourOptions: Array,
      minuteOptions: Array,
      secondOptions: Array,
      disabledHours: Function,
      disabledMinutes: Function,
      disabledSeconds: Function,
      use12Hours: Boolean,
    },
    data() {
      return {};
    },
    computed: {
      classes() {
        const { prefixCls } = this;
        return {
          [`${prefixCls}-combobox`]: true,
        };
      },
      hourSelect() {
        const {
          value, showHour, hourOptions, disabledHours, genItem, genSelect
        } = this;
        const hour = getHours(value);
        const disabledOpts = disabledHours && disabledHours();
        return genSelect(
          'hour',
          showHour,
          () => hourOptions.map(v => genItem(v, disabledOpts)),
          () => hourOptions.indexOf(hour)
        );
      },
      minuteSelect() {
        const {
          value, showMinute, minuteOptions, disabledMinutes, genItem, genSelect
        } = this;

        const hour = getHours(value);
        const minute = getMinutes(value);
        const disabledOpts = disabledMinutes && disabledMinutes(hour);
        return genSelect(
          'minute',
          showMinute,
          () => minuteOptions.map(v => genItem(v, disabledOpts)),
          () => minuteOptions.indexOf(minute)
        );
      },
      secondSelect() {
        const {
          value, showSecond, secondOptions, disabledSeconds, genItem, genSelect
        } = this;
        const hour = getHours(value);
        const minute = getMinutes(value);
        const second = getSeconds(value);
        const disabledOpts = disabledSeconds && disabledSeconds(hour, minute);
        return genSelect(
          'second',
          showSecond,
          () => secondOptions.map(v => genItem(v, disabledOpts)),
          () => secondOptions.indexOf(second)
        );
      },
    },
    methods: {
      genItem(val, disabledOpts) {
        const item = {};
        item.value = leftPad(`${val}`, 2, '0');
        if (disabledOpts && disabledOpts.indexOf(val) !== -1) {
          item.disabled = true;
        }
        return item;
      },
      genSelect(type, isShow, getList, getSelectedIndex) {
        return {
          type,
          show: isShow,
          list: getList(),
          selectedIndex: getSelectedIndex(),
          onSelect: this.onSelect.bind(this, type),
        };
      },
      onSelect(type, item) {
        let nVal = this.value;
        switch (type) {
          case 'hour':
            nVal = setHours(nVal, item.value);
            break;
          case 'minute':
            nVal = setMinutes(nVal, item.value);
            break;
          case 'second':
            nVal = setSeconds(nVal, item.value);
            break;
          default:
            break;
        }

        this.$emit('on-change', nVal);
      },
    },
    components: {
      VSelect,
    },
  };
</script>
