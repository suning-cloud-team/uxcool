import { buildComponentName } from '../utils';

export default {
  name: buildComponentName('SelectOption'),
  isOptionType: true,
  props: {
    uid: {
      type: String,
      default: '',
    },
    value: {
      type: [String, Number],
      required: true,
    },
    label: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
