import { buildComponentName } from '../utils';

export default {
  name: buildComponentName('SelectOptionGroup'),
  isOptionGroupType: true,
  props: {
    id: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      required: true,
    },
  },
};
