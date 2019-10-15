import { buildComponentName } from '../utils';
import RangeMonthYearMixin from './mixins/rangeMonthYear';

export default {
  name: buildComponentName('RangeMonthPicker'),
  mixins: [RangeMonthYearMixin],
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
      mode: ['month', 'month'],
    };
  },
};
