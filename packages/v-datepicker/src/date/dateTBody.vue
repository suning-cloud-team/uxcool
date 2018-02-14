<template>
  <tbody :class="`${prefixCls}-tbody`">
    <tr role="row"
        v-for="(row,i) in dates"
        :key="i">
      <td role="gridcell"
          v-for="(col,j) in row"
          :key="j"
          :title="col.title"
          :class="cellClasses(col, j, row)"
          @mouseenter="onMouseEnter(col)"
          @click="onSelect(col)">
        <a :class="`${prefixCls}-date`">{{col.name}}</a>
      </td>
    </tr>
  </tbody>
</template>

<script>
  import { getDay, setDate, isSameDay, isSameMonth, isBefore, isAfter, startOfDay } from 'date-fns';
  import { DATE_STYLE } from '../constant';
  import { formatDate } from '../utils';

  export default {
    name: 'DateTBody',
    props: {
      prefixCls: String,
      format: String,
      value: Date,
      selectedValue: [Date, Array],
      hoverValues: Array,
      locale: Object,
      disabledDate: Function,
    },
    computed: {
      dates() {
        const {
          value, format, disabledDate, selectedValue
        } = this;
        const dates = [];
        const day = getDay(setDate(value, 1));
        let idx = 1 - day;
        for (let i = 0; i < DATE_STYLE.row; i += 1) {
          dates[i] = [];
          for (let j = 0; j < DATE_STYLE.col; j += 1) {
            const date = setDate(value, idx);
            dates[i].push({
              id: idx,
              title: formatDate(date, format),
              name: formatDate(date, 'D'),
              value: date,
              disabled: disabledDate(date, value, selectedValue),
            });
            idx += 1;
          }
        }
        return dates;
      },
    },

    methods: {
      cellClasses(day, j, row) {
        const {
          prefixCls, value, selectedValue, hoverValues
        } = this;
        let isSelectedDay = false;
        let isInRange = false;
        let isSelectedStartDay = false;
        let isSelectedEndDay = false;
        if (selectedValue && Array.isArray(selectedValue)) {
          const ranges = hoverValues.length > 0 ? hoverValues : selectedValue;
          if (isSameMonth(day.value, value)) {
            const startVal = ranges[0];
            const endVal = ranges[1];
            if (startVal) {
              if (isSameDay(day.value, startVal)) {
                isSelectedDay = true;
                isSelectedStartDay = true;
              }
              if (endVal) {
                if (isSameDay(day.value, endVal)) {
                  isSelectedDay = true;
                  isSelectedEndDay = true;
                } else if (
                  isAfter(startOfDay(day.value), startOfDay(startVal)) &&
                  isBefore(startOfDay(day.value), startOfDay(endVal))
                ) {
                  isInRange = true;
                }
              }
            }
          }
        } else if (isSameDay(day.value, value)) {
          isSelectedDay = true;
        }

        return {
          [`${prefixCls}-cell`]: true,
          [`${prefixCls}-today`]: isSameDay(day.value, new Date()),
          [`${prefixCls}-selected-date`]: isSameDay(day.value, selectedValue),
          [`${prefixCls}-selected-start-date`]: isSelectedStartDay,
          [`${prefixCls}-selected-end-date`]: isSelectedEndDay,
          [`${prefixCls}-selected-day`]: isSelectedDay,
          [`${prefixCls}-disabled-cell`]: day.disabled,
          [`${prefixCls}-in-range-cell`]: isInRange,
          [`${prefixCls}-last-month-cell`]: !isSameMonth(day.value, value) && day.id <= 0,
          [`${prefixCls}-next-month-btn-day`]: !isSameMonth(day.value, value) && day.id > 0,
          [`${prefixCls}-disabled-cell-first-of-row`]:
            day.disabled && (j === 0 || !row[j - 1].disabled),
          [`${prefixCls}-disabled-cell-last-of-row`]:
            day.disabled && (j === DATE_STYLE.col - 1 || !row[j + 1].disabled),
        };
      },
      onMouseEnter(day) {
        if (day.disabled) {
          return;
        }
        this.$emit('on-day-hover', day.value);
      },
      onSelect(day) {
        if (day.disabled) {
          return;
        }
        this.$emit('on-select', day.value);
      },
    },
  };
</script>
