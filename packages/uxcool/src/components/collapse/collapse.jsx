import { isArray, isEqual } from '@cloud-sn/v-utils';
import { buildComponentName } from '../utils';

export default {
  name: buildComponentName('Collapse'),
  provide() {
    return {
      collapseRoot: this,
    };
  },
  model: {
    prop: 'activeKeys',
  },
  props: {
    prefixCls: {
      type: String,
      default: 'ux-collapse',
    },
    activeKeys: {
      type: [String, Number, Array],
      default: '',
    },
    accordion: {
      type: Boolean,
      default: false,
    },
    destroyInactivePanel: {
      type: Boolean,
      default: false,
    },
    border: {
      type: Boolean,
      default: true,
    },
    control: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      innerActiveKeys: null,
    };
  },
  computed: {
    classes() {
      const { prefixCls, border } = this;
      return {
        [prefixCls]: true,
        [`${prefixCls}-borderless`]: !border,
      };
    },
  },
  watch: {
    activeKeys(nVal, oVal) {
      if (!isEqual(nVal, oVal)) {
        this.setInnerActiveKeys(nVal);
      }
    },
  },
  created() {
    const { activeKeys, setInnerActiveKeys } = this;
    setInnerActiveKeys(activeKeys);
  },

  methods: {
    setInnerActiveKeys(keys = []) {
      this.innerActiveKeys = isArray(keys) ? keys : [keys];
    },
    onHeaderClick(key) {
      const {
        control, innerActiveKeys, accordion, setInnerActiveKeys
      } = this;
      const idx = innerActiveKeys.indexOf(key);
      let keys = [...innerActiveKeys];
      if (accordion) {
        keys = idx > -1 ? [] : [key];
      } else if (idx > -1) {
        keys.splice(idx, 1);
      } else {
        keys.push(key);
      }
      if (!control) {
        setInnerActiveKeys(keys);
      }

      const val = accordion ? keys[0] : keys;
      this.$emit('input', val);
      this.$emit('change', val);
    },
  },
  render() {
    const { $slots, classes, accordion } = this;

    return (
      <div class={classes} role={accordion ? 'tablist' : null}>
        {$slots.default}
      </div>
    );
  },
};
