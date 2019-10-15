import CalendarLocale from '@suning/v-datepicker/es/locale/zh_CN';
import DateFnsLocale from 'date-fns/locale/zh_cn';

export default {
  lang: {
    // 与 date-fns的locale对应
    DateFnsLocale,
    placeholder: '请选择日期',
    rangePlaceholder: ['开始日期', '结束日期'],
    rangeMonthPlaceholder: ['开始月份', '结束月份'],
    rangeYearPlaceholder: ['开始年份', '结束年份'],
    ...CalendarLocale,
  },
};
