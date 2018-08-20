<template>
  <table :class="`${prefixCls}-table`"
         cellSpacing="0"
         role="grid">
    <date-thead :prefix-cls="prefixCls"
                :value="value"
                :selected-value="selectedValue"
                :locale="locale"></date-thead>

    <date-tbody :prefix-cls="prefixCls"
                :value="value"
                :selected-value="selectedValue"
                :locale="locale"
                :format="format"
                :range-values="rangeValues"
                :hover-values="hoverValues"
                :disabled-date="disabledDate"
                :date-render="dateRender"
                :content-render="contentRender"
                @on-day-hover="onDayHover"
                @on-select="onSelect">
    </date-tbody>
  </table>
</template>

<script>
  import DateThead from './dateTHead.vue';
  import DateTbody from './dateTBody';

  export default {
    name: 'DateTable',
    props: {
      prefixCls: String,
      value: Date,
      selectedValue: [Date, Array],
      locale: Object,
      format: String,
      rangeValues: {
        type: Array,
        default() {
          return [];
        },
      },
      hoverValues: {
        type: Array,
        default() {
          return [];
        },
      },
      disabledDate: {
        type: Function,
        default() {
          return false;
        },
      },
      dateRender: {
        type: Function,
        default: null,
      },
      contentRender: {
        type: Function,
        default: null,
      },
    },
    methods: {
      onSelect(value) {
        this.$emit('on-select', value);
        this.$emit('select', value);
      },
      onDayHover(value) {
        this.$emit('on-day-hover', value);
        this.$emit('day-hover', value);
      },
    },
    components: {
      DateThead,
      DateTbody,
    },
  };
</script>
