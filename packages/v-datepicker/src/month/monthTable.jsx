import { setMonth, isSameMonth } from 'date-fns';
import { isFunction } from '@suning/v-utils';
import { MONTH_STYLE } from '../constant';
import { formatDate } from '../utils';

export default {
  name: 'MonthTable',
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
    onSelect(month) {
      if (month.disabled) {
        return;
      }
      this.$emit('on-select', month.value);
      this.$emit('select', month.value);
    },
    cellClasses(month) {
      const { prefixCls, value } = this;
      return {
        [`${prefixCls}-cell`]: true,
        [`${prefixCls}-cell-disabled`]: month.disabled,
        [`${prefixCls}-selected-cell`]: isSameMonth(value, month.value),
        [`${prefixCls}-current-cell`]: isSameMonth(month.value, new Date()),
      };
    },
    renderCell(col) {
      const {
        prefixCls, value, monthRender, contentRender, cellClasses, onSelect
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
