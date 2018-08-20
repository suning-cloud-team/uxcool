import CalendarLocale from '@suning/v-datepicker/es/locale/en_US';
import DateFnsLocale from 'date-fns/locale/en';

export default {
  lang: {
    DateFnsLocale,
    placeholder: 'Select date',
    rangePlaceholder: ['Start date', 'End date'],
    ...CalendarLocale,
  },
};
