import { buildComponentName } from '../utils';
import MonthYearMixin from './mixins/monthYear';

export default {
  name: buildComponentName('YearPicker'),
  mixins: [MonthYearMixin],
  props: {
    format: {
      type: String,
      default: 'YYYY',
    },
    disabledYear: {
      type: Function,
      default: undefined,
    },
  },
  data() {
    return {
      mode: 'year',
    };
  },
};
