import {
  setDate,
  isSameDay,
  isSameMonth,
  isBefore,
  isAfter,
  startOfDay,
  startOfWeek,
  differenceInCalendarDays,
  isWithinRange,
  isDate,
} from 'date-fns';
import { isFunction, isArray } from '@suning/v-utils';
import { DATE_STYLE } from '../constant';
import { formatDate } from '../utils';
import getWeek from '../week-utils';
import MultiCalendarMixin from '../mixins/multiCalendar';

export default {
  name: 'DateTBody',
  mixins: [MultiCalendarMixin],
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
    showWeekNumber: {
      type: Boolean,
      default: false,
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
        value,
        format,
        locale: {
          DateFnsLocale,
          WeekLocale: { weekStartsOn },
        },
        disabledDate,
        selectedValue,
      } = this;
      const dates = [];

      const monthStart = setDate(value, 1);
      const weekStart = startOfWeek(monthStart, { weekStartsOn });
      let idx = differenceInCalendarDays(weekStart, monthStart) + 1;
      // const day = getDay(setDate(value, 1));
      // let idx = 1 - day;
      for (let i = 0; i < DATE_STYLE.row; i += 1) {
        dates[i] = [];
        for (let j = 0; j < DATE_STYLE.col; j += 1) {
          const date = setDate(value, idx);
          dates[i].push({
            id: idx,
            title: formatDate(date, format, { locale: DateFnsLocale }),
            name: formatDate(date, 'D', { locale: DateFnsLocale }),
            value: date,
            disabled: disabledDate(date, value, selectedValue),
          });
          idx += 1;
        }
      }
      return dates;
    },
    isRangeCalendar() {
      const { isMultiCalendarChildren, selectedValue } = this;

      return !isMultiCalendarChildren && selectedValue && isArray(selectedValue);
    },
    multiCalendarValueMap() {
      const { isMultiCalendarChildren, selectedValue } = this;

      if (isMultiCalendarChildren) {
        if (selectedValue) {
          const values = isArray(selectedValue) ? selectedValue : [selectedValue];
          return values.reduce((r, v) => {
            const nr = r;
            if (isDate(v)) {
              // 移除时分秒后,获取毫秒数
              nr[startOfDay(v).getTime()] = 1;
            }
            return nr;
          }, {});
        }
      }
      return {};
    },
  },
  methods: {
    cellClasses(day, j, row) {
      const {
        prefixCls,
        isMultiCalendarChildren,
        multiCalendarValueMap,
        isRangeCalendar,
        value,
        selectedValue,
        hoverValues,
      } = this;
      let isSelectedDay = false;
      let isInRange = false;
      let isSelectedStartDay = false;
      let isSelectedEndDay = false;
      if (isMultiCalendarChildren) {
        const nDay = day;
        const dayTime = startOfDay(nDay.value).getTime();
        if (dayTime in multiCalendarValueMap) {
          isSelectedDay = true;
          nDay.isSelected = true;
        }
      } else if (isRangeCalendar) {
        const ranges = hoverValues.length > 0 ? hoverValues : selectedValue;
        // 日历展示会包括部分上月与下月日期, 如果选中需要忽略渲染
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
        // } else if (isSameDay(day.value, value)) {
        // 与  selected-date 逻辑 一致
      } else if (isSameDay(day.value, selectedValue)) {
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
    weekClasses(dates = []) {
      const {
        prefixCls, isRangeCalendar, hoverValues, selectedValue
      } = this;

      const [{ value: rangeStart }] = dates;
      const { value: rangeEnd } = dates[dates.length - 1];
      let isActiveWeek = false;
      if (isRangeCalendar) {
        const ranges = hoverValues.length > 0 ? hoverValues : selectedValue;
        if (
          isWithinRange(ranges[0], rangeStart, rangeEnd) ||
          isWithinRange(ranges[1], rangeStart, rangeEnd)
        ) {
          isActiveWeek = true;
        }
      } else if (isWithinRange(selectedValue, rangeStart, rangeEnd)) {
        isActiveWeek = true;
      }

      return {
        [`${prefixCls}-current-week`]: isWithinRange(new Date(), rangeStart, rangeEnd),
        [`${prefixCls}-active-week`]: isActiveWeek,
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
      const { isMultiCalendarChildren } = this;
      if (day.disabled) {
        return;
      }
      // 多选时包含取消操作, 单独处理
      if (isMultiCalendarChildren) {
        if (day.isSelected === true) {
          this.onMultiCalendarUnSelect(day.value);
        } else {
          this.onMultiCalendarSelect(day.value);
        }
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
    renderCells(range = []) {
      const { renderCell } = this;
      return range.map((col, idx) => renderCell(col, idx, range));
    },
    renderWeekCell(range = []) {
      const {
        prefixCls,
        locale: { WeekLocale },
      } = this;
      const [startDay] = range;
      return (
        <td class={`${prefixCls}-week-number-cell`}>
          {getWeek(startDay.value, { ...WeekLocale })}
        </td>
      );
    },
  },
  render() {
    const {
      prefixCls, dates, showWeekNumber, weekClasses, renderWeekCell, renderCells
    } = this;
    return (
      <tbody class={`${prefixCls}-tbody`}>
        {dates.map((range, i) => {
          const rowAttrs = {
            role: 'row',
            key: i,
          };
          let weekCell = null;
          if (showWeekNumber) {
            rowAttrs.class = weekClasses(range);
            weekCell = renderWeekCell(range);
          }
          return (
            <tr {...rowAttrs}>
              {weekCell}
              {renderCells(range)}
            </tr>
          );
        })}
      </tbody>
    );
  },
};
