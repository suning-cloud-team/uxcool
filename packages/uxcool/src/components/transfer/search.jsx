import { buildComponentName, getComponentPrefix } from '../utils';
import Input from '../input';
import Icon from '../icon';

export default {
  name: buildComponentName('TransferListItem'),
  props: {
    prefixCls: {
      type: String,
      default: `${getComponentPrefix()}-transfer-list-search`,
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
  methods: {
    onInput(val) {
      this.innerValue = val;
      this.$emit('input', val);
    },
    onClear() {
      this.innerValue = '';
      this.$emit('clear');
    },
  },
  render() {
    const {
      $attrs, prefixCls, disabled, innerValue, onInput, onClear
    } = this;
    const props = {
      value: innerValue,
      disabled,
    };
    const icon = innerValue ? (
      <span role="link" class={`${prefixCls}-action`} on-click={onClear}>
        <Icon type="close_circle" />
      </span>
      ) : (
      <span class={`${prefixCls}-action`}>
        <Icon type="search" />
      </span>
    );
    return (
      <div>
        <Input
          {...{
            class: prefixCls,
            props,
            attrs: $attrs,
            on: {
              input: onInput,
            },
          }}
        />
        {icon}
      </div>
    );
  },
};
