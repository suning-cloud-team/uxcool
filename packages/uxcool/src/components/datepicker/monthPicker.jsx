import { buildComponentName } from '../utils';
import MonthYearMixin from './mixins/monthYear';

export default {
  name: buildComponentName('MonthPicker'),
  mixins: [MonthYearMixin],
  props: {
    format: {
      type: String,
      default: 'YYYY-MM',
    },
    disabledMonth: {
      type: Function,
      default: undefined,
    },
  },
  data() {
    return {
      mode: 'month',
    };
  },
};
