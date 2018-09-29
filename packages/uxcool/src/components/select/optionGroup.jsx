import { buildComponentName } from '../utils';

export default {
  name: buildComponentName('SelectOptionGroup'),
  isOptionGroupType: true,
  props: {
    uid: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      required: true,
    },
  },
};
