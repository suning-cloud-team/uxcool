import CalendarLocale from '@suning/v-datepicker/es/locale/en_US';
import DateFnsLocale from 'date-fns/locale/en';

export default {
  lang: {
    WeekLocale: {
      weekStartsOn: 0,
      /* Sunday */
      firstWeekContainsDate: 1,
    },
    DateFnsLocale,
    placeholder: 'Select date',
    multiPlaceholder: 'Select one or more dates',
    rangePlaceholder: ['Start date', 'End date'],
    rangeMonthPlaceholder: ['Start Month', 'End Month'],
    rangeYearPlaceholder: ['Start Year', 'End Year'],
    weekFormat: 'YYYY Wo',
    ...CalendarLocale,
  },
};
