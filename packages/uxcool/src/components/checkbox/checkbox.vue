<template>
  <label :class="classes">
    <v-checkbox :class="indeterminateClasses"
                v-bind="[$attrs, bindProps]"
                v-on="bindListeners" />
    <span v-if="label||$slots.default">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script>
  import omit from 'object.omit';
  import VCheckbox from '@suning/v-checkbox';
  import { buildComponentName } from '../utils';
  import Mixin from './mixin';

  export default {
    name: buildComponentName('Checkbox'),
    components: {
      VCheckbox,
    },
    mixins: [Mixin],
    model: {
      prop: 'checked',
    },
    props: {
      prefixCls: {
        type: String,
        default: 'ux-checkbox',
      },
      checked: {
        type: Boolean,
        default: false,
      },
      value: {
        type: [String, Number],
        default: '',
      },
      // eslint-disable-next-line
      disabled: Boolean,
      indeterminate: {
        type: Boolean,
        default: false,
      },
      label: {
        type: String,
        default: '',
      },
    },
    computed: {
      classes() {
        const { prefixCls } = this;
        return {
          [`${prefixCls}-wrapper`]: true,
        };
      },
      indeterminateClasses() {
        const { prefixCls, indeterminate } = this;
        return {
          [`${prefixCls}-indeterminate`]: indeterminate,
        };
      },
      bindProps() {
        const {
          $props, isChildren, rootValue, value, rootDisabled
        } = this;
        const p = omit($props, 'label');
        if (isChildren) {
          p.checked = rootValue.indexOf(value) > -1;
          p.disabled = p.disabled !== undefined ? p.disabled : rootDisabled;
        }
        return p;
      },
      bindListeners() {
        const { $listeners, isChildren, toggleCheckbox } = this;
        const p = { ...$listeners };
        if (isChildren) {
          p.change = (e) => {
            toggleCheckbox(e.target.value);
          };
        }
        return p;
      },
    },
  };
</script>
