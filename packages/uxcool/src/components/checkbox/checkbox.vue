<template>
  <label :class="classes">
    <v-checkbox ref="checkboxRef"
                :class="indeterminateClasses"
                v-bind="[$attrs, bindProps]"
                v-on="bindListeners"
    />
    <span v-if="label||$slots.default">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script>
  import omit from 'object.omit';
  import VCheckbox from '@cloud-sn/v-checkbox';
  import { buildComponentName } from '../utils';
  import Mixin from './mixin';

  export default {
    name: buildComponentName('Checkbox'),
    // vee-validate compatibility (http://vee-validate.logaretm.com/advanced.html#ctor)
    $_veeValidate: {
      rejectsFalse: true,
      value() {
        return this.$refs.checkboxRef.getValue();
      },
    },
    components: {
      VCheckbox,
    },
    mixins: [Mixin],
    inheritAttrs: false,

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
      disabled: {
        type: Boolean,
        default: null,
      },
      indeterminate: {
        type: Boolean,
        default: false,
      },
      label: {
        type: String,
        default: '',
      },
      control: {
        type: Boolean,
        default: false,
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
        const p = omit($props, ['label', 'indeterminate']);
        if (isChildren) {
          p.checked = rootValue.indexOf(value) > -1;
          p.disabled = p.disabled !== null ? !!p.disabled : rootDisabled;
        }
        return p;
      },
      bindListeners() {
        const {
          $listeners, isChildren, onInput, onChange, toggleCheckbox
        } = this;
        const p = {
          ...$listeners,
          input: onInput,
          change: onChange,
        };
        if (isChildren) {
          p.change = (e) => {
            toggleCheckbox(e.target.value);
          };
        }
        return p;
      },
    },
    methods: {
      onInput(checked) {
        this.$emit('input', checked);
      },
      onChange(e) {
        this.$emit('change', e);
      },
      focus() {
        const {
          $refs: { checkboxRef },
        } = this;
        if (checkboxRef) {
          checkboxRef.focus();
        }
      },
      blur() {
        const {
          $refs: { checkboxRef },
        } = this;
        if (checkboxRef) {
          checkboxRef.blur();
        }
      },
    },
  };
</script>
