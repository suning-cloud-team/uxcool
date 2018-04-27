import { buildComponentName } from '../utils';
import Checkbox from './checkbox.vue';

export default {
  name: buildComponentName('CheckboxGroup'),
  provide() {
    return {
      checkboxGroupRoot: this,
    };
  },
  components: {
    Checkbox,
  },
  props: {
    prefixCls: {
      type: String,
      default: 'ux-checkbox-group',
    },
    options: {
      type: Array,
      default() {
        return [];
      },
    },
    value: {
      type: Array,
      default() {
        return [];
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      innerValue: [],
    };
  },
  computed: {
    classes() {
      const { prefixCls } = this;
      return {
        [prefixCls]: true,
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
      if (nVal) {
        this.innerValue = nVal;
      }
    },
  },
  created() {
    this.innerValue = this.value;
  },
  methods: {
    toggleCheckbox(optVal) {
      if (!optVal) {
        return;
      }
      const { innerValue } = this;
      const nVal = [...innerValue];
      const idx = nVal.indexOf(optVal);
      if (idx !== -1) {
        nVal.splice(idx, 1);
      } else {
        nVal.push(optVal);
      }

      this.$emit('change', nVal, [...innerValue]);
      this.$emit('input', nVal);
      this.innerValue = nVal;
    },
  },
  render() {
    const { prefixCls, classes, normalizeOptions } = this;
    const opts = normalizeOptions;
    const checkboxs =
      opts.length > 0
        ? opts.map(v => (
            <checkbox
              class={`${prefixCls}-item`}
              value={v.value}
              disabled={v.disabled}
              label={v.label}
            />
        ))
        : this.$slots.default;
    return <div class={classes}>{checkboxs}</div>;
  },
};
