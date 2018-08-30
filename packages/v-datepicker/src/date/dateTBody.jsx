import { getDay, setDate, isSameDay, isSameMonth, isBefore, isAfter, startOfDay } from 'date-fns';
import { isFunction } from '@suning/v-utils';
import { DATE_STYLE } from '../constant';
import { formatDate } from '../utils';

export default {
  name: 'DateTBody',
  props: {
    prefixCls: {
      type: String,
      default: undefined,
    },
    format: {
      type: String,
      default: undefined,
    },
    value: {
      type: Date,
      default: undefined,
    },
    selectedValue: {
      type: [Date, Array],
      default: undefined,
    },
    hoverValues: {
      type: Array,
      default: undefined,
    },
    locale: {
      type: Object,
      default: undefined,
    },
    disabledDate: {
      type: Function,
      default: undefined,
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
  computed: {
    dates() {
      const {
        value, format, locale, disabledDate, selectedValue
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
            title: formatDate(date, format, { locale: locale.DateFnsLocale }),
            name: formatDate(date, 'D', { locale: locale.DateFnsLocale }),
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
      this.$emit('day-hover', day.value);
    },
    onSelect(day) {
      if (day.disabled) {
        return;
      }
      this.$emit('on-select', day.value);
      this.$emit('select', day.value);
    },
    renderCell(col, idx, date) {
      const {
        prefixCls,
        value,
        cellClasses,
        dateRender,
        contentRender,
        onMouseEnter,
        onSelect,
      } = this;
      let content = null;
      if (isFunction(dateRender)) {
        content = dateRender({ current: col.value, value });
      } else {
        const cellContent = isFunction(contentRender)
          ? contentRender({ current: col.value, value })
          : col.name;
        content = <div class={`${prefixCls}-date`}>{cellContent}</div>;
      }
      return (
        <td
          role="gridcell"
          title={col.title}
          class={cellClasses(col, idx, date)}
          on-mouseenter={() => onMouseEnter(col)}
          on-click={() => onSelect(col)}
        >
          {content}
        </td>
      );
    },
    renderCells(date = []) {
      const { renderCell } = this;
      return date.map((col, idx) => renderCell(col, idx, date));
    },
  },
  render() {
    const { prefixCls, dates, renderCells } = this;
    return (
      <tbody class={`${prefixCls}-tbody`}>
        {dates.map((date, i) => (
          <tr role="row" key={i}>
            {renderCells(date)}
          </tr>
        ))}
      </tbody>
    );
  },
};
