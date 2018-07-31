import { buildComponentName } from '../utils';
import commonProps from './props';
import Header from './header';
import Combobox from './combobox';

export default {
  name: buildComponentName('TimepickerPanel'),
  provide() {
    return {
      timePanelRoot: this,
    };
  },
  props: {
    ...commonProps,
    visible: {
      type: Boolean,
      default: false,
    },
    triggerRef: {
      type: Object,
      default: null,
    },
  },
  methods: {
    onChange(value) {
      this.$emit('change', value);
    },
    onSelect(type, value) {
      this.$emit('select', type, value);
    },
    onClear() {
      this.$emit('clear');
    },
  },
  render() {
    const { $slots, prefixCls } = this;
    return (
      <div class={`${prefixCls}-inner`}>
        <Header />
        <Combobox />
        {$slots.addon}
      </div>
    );
  },
};
