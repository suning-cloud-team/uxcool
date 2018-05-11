import { buildComponentName } from '../utils';
import Radio from './radio.vue';
import RadioButton from './button.vue';

export default {
  name: buildComponentName('RadioGroup'),
  provide() {
    return {
      radioGroupRoot: this,
    };
  },
  props: {
    prefixCls: {
      type: String,
      default: 'ux-radio-group',
    },
    type: {
      type: String,
      default: 'default',
      validate(val) {
        return ['default', 'button'].indexOf(val) > -1;
      },
    },
    name: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: null,
    },
    options: {
      type: Array,
      default() {
        return [];
      },
    },
    size: {
      type: String,
      default: 'default',
      validate(val) {
        return ['large', 'default', 'small'].indexOf(val) > -1;
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      innerValue: '',
    };
  },
  computed: {
    classes() {
      const { prefixCls, size } = this;
      return {
        [prefixCls]: true,
        [`${prefixCls}-${size}`]: size,
      };
    },
    normalizeOptions() {
      const { options = [] } = this;
      return options.map((v) => {
        let ret = v;
        if (typeof v === 'string') {
          ret = {
            label: v,
            value: v,
          };
        }
        return ret;
      });
    },
  },
  watch: {
    value(nVal) {
      this.innerValue = nVal;
    },
  },
  created() {
    this.innerValue = this.value;
  },
  methods: {
    onGroupChange(optVal) {
      if (!optVal) {
        return;
      }
      const { innerValue } = this;
      if (innerValue !== optVal) {
        this.$emit('change', optVal, innerValue);
        this.$emit('input', optVal);
        this.innerValue = optVal;
      }
    },
  },
  render() {
    const { classes, type, normalizeOptions } = this;
    const Cmp = type === 'button' ? RadioButton : Radio;
    const radios =
      normalizeOptions.length > 0
        ? normalizeOptions.map(v => <Cmp label={v.label} value={v.value} disabled={v.disabled} />)
        : this.$slots.default;
    return <div class={classes}>{radios}</div>;
  },
};
