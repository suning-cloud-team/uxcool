import { setMonth, isSameMonth, isAfter, isBefore, startOfMonth } from 'date-fns';
import { isFunction, isArray } from '@cloud-sn/v-utils';
import { MONTH_STYLE } from '../constant';
import { formatDate } from '../utils';
import MonthYearDecadeMixin from '../mixins/monthYearDecade';

export default {
  name: 'MonthTable',
  mixins: [MonthYearDecadeMixin],
  props: {
    prefixCls: {
      type: String,
      default: undefined,
    },
    locale: {
      type: Object,
      default: undefined,
    },
    value: {
      type: Date,
      default: undefined,
    },
    disabledMonth: {
      type: Function,
      default() {
        return false;
      },
    },
    monthRender: {
      type: Function,
      default: null,
    },
    contentRender: {
      type: Function,
      default: null,
    },
  },
  computed: {
    months() {
      const { value, disabledMonth, locale } = this;
      const months = [];
      let idx = 0;
      for (let i = 0; i < MONTH_STYLE.row; i += 1) {
        months[i] = [];
        for (let j = 0; j < MONTH_STYLE.col; j += 1) {
          const curMonth = setMonth(value, idx);
          const name = formatDate(curMonth, 'MMM', { locale: locale.DateFnsLocale });
          const disabled = disabledMonth(curMonth);
          months[i].push({
            id: idx,
            title: name,
            name,
            value: curMonth,
            disabled,
          });
          idx += 1;
        }
      }
      return months;
    },
  },
  methods: {
    onMouseEnter(month) {
      if (month.disabled) {
        return;
      }

      this.$emit('month-hover', month.value);
      this.onMonthYearDecadeRootHover('month', month.value);
    },
    onSelect(month) {
      if (month.disabled) {
        return;
      }
      this.$emit('on-select', month.value);
      this.$emit('select', month.value);
    },
    getRangeClasses(monthVal) {
      const { prefixCls, isChildren } = this;
      if (isChildren) {
        let isInRange = false;
        let isSelectedStartMonth = false;
        let isSelectedEndMonth = false;
        let isSelectedMonth = false;
        const { monthYearHoverValue: hoverValue, monthYearSelectedValue: selectedValue } = this;
        if (selectedValue && isArray(selectedValue)) {
          const ranges = hoverValue.length > 0 ? hoverValue : selectedValue;
          const [start, end] = ranges;
          if (start) {
            if (isSameMonth(monthVal, start)) {
              isSelectedMonth = true;
              isSelectedStartMonth = true;
            }
            if (end) {
              if (isSameMonth(monthVal, end)) {
                isSelectedMonth = true;
                isSelectedEndMonth = true;
              } else if (
                isAfter(startOfMonth(monthVal), startOfMonth(start)) &&
                isBefore(startOfMonth(monthVal), startOfMonth(end))
              ) {
                isInRange = true;
              }
            }
          }
        }
        return {
          [`${prefixCls}-selected-start-month`]: isSelectedStartMonth,
          [`${prefixCls}-selected-end-month`]: isSelectedEndMonth,
          [`${prefixCls}-in-range-cell`]: isInRange,
          [`${prefixCls}-selected-month`]: isSelectedMonth,
        };
      }

      return {};
    },
    cellClasses(month) {
      const { prefixCls, value, isChildren } = this;
      const { value: monthVal } = month;
      const rangeClasses = this.getRangeClasses(monthVal);
      return {
        [`${prefixCls}-cell`]: true,
        [`${prefixCls}-cell-disabled`]: month.disabled,
        [`${prefixCls}-selected-cell`]: !isChildren && isSameMonth(value, monthVal),
        [`${prefixCls}-current-cell`]: !isChildren && isSameMonth(monthVal, new Date()),
        ...rangeClasses,
      };
    },
    renderCell(col) {
      const {
        prefixCls,
        value,
        monthRender,
        contentRender,
        cellClasses,
        onMouseEnter,
        onSelect,
      } = this;
      let content = null;
      if (isFunction(monthRender)) {
        content = monthRender({ current: col.value, value });
      } else {
        const cellContent = isFunction(contentRender)
          ? contentRender({ current: col.value, value })
          : col.name;
        content = <a class={`${prefixCls}-month`}>{cellContent}</a>;
      }
      return (
        <td
          role="gridcell"
          title={col.title}
          class={cellClasses(col)}
          on-mouseenter={() => onMouseEnter(col)}
          on-click={() => onSelect(col)}
        >
          {content}
        </td>
      );
    },
    renderCells(month = []) {
      const { renderCell } = this;
      return month.map(col => renderCell(col));
    },
  },
  render() {
    const { prefixCls, months, renderCells } = this;
    return (
      <table role="monthgrid" class={`${prefixCls}-table`} cellSpacing="0">
        <tbody class={`${prefixCls}-tbody`}>
          {months.map((month, i) => (
            <tr role="row" key={i}>
              {renderCells(month)}
            </tr>
          ))}
        </tbody>
      </table>
    );
  },
};
