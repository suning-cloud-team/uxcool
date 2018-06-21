import { buildComponentName } from '../utils';
import Dropdown from './dropdown';
import Button from '../button';

const dropdownPropKeys = Dropdown.props;
export default {
  name: buildComponentName('DropdownButton'),
  model: {
    prop: 'visible',
  },
  props: {
    ...dropdownPropKeys,
    ...Button.Group.props,
    prefixCls: {
      type: String,
      default: 'ux-dropdown-button',
    },
    placement: {
      type: String,
      default: 'bottomRight',
    },
    type: {
      type: String,
      default: '',
      validator(val) {
        return ['', 'primary', 'ghost', 'dashed', 'danger'].indexOf(val) > -1;
      },
    },
  },
  computed: {
    bindDropdownProps() {
      const { $props } = this;
      return {
        ...$props,
        prefixCls: 'ux-dropdown',
      };
    },
  },
  methods: {
    onInput(...args) {
      this.$emit('input', ...args);
    },
    onOverlayClick(...args) {
      this.$emit('overlay-click', ...args);
    },
    onVisibleChange(...args) {
      this.$emit('visible-change', ...args);
    },
    onClick(e) {
      this.$emit('click', e);
    },
  },
  render() {
    const {
      $slots,
      bindDropdownProps,
      size,
      type,
      disabled,
      onClick,
      onInput,
      onOverlayClick,
      onVisibleChange,
    } = this;
    // const dropdownProps = Object.keys($props || {}).reduce((r, k) => {
    //   const nr = r;
    //   if (k in dropdownPropKeys) {
    //     nr[k] = $props[k];
    //   }
    //   return nr;
    // }, {});

    const on = {
      input: onInput,
      'overlay-click': onOverlayClick,
      'visible-change': onVisibleChange,
    };
    return (
      <Button.Group size={size}>
        <Button type={type} disabled={disabled} on-click={onClick}>
          {$slots.default}
        </Button>
        <Dropdown {...{ props: bindDropdownProps, on }}>
          <Button slot="trigger" type={type} icon="more" />
          <template slot="overlay">{$slots.overlay}</template>
        </Dropdown>
      </Button.Group>
    );
  },
};
