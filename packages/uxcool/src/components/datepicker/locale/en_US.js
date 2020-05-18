import CalendarLocale from '@cloud-sn/v-datepicker/es/locale/en_US';
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
    monthPlaceholder: 'Select month',
    yearPlaceholder: 'Select year',
    weekPlaceholder: 'Select week',
    rangePlaceholder: ['Start date', 'End date'],
    rangeMonthPlaceholder: ['Start month', 'End month'],
    rangeYearPlaceholder: ['Start year', 'End year'],
    weekFormat: 'YYYY Wo',
    ...CalendarLocale,
  },
};
