<template>
  <label :class="classes">
    <v-checkbox ref="radioRef"
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
    name: buildComponentName('Radio'),
    $_veeValidate: {
      rejectsFalse: true,
      value() {
        return this.$refs.radioRef.getValue();
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
        default: 'ux-radio',
      },
      checked: {
        type: Boolean,
        default: false,
      },
      value: {
        type: String,
        default: '',
      },
      disabled: {
        type: Boolean,
        default: null,
      },
      label: {
        type: String,
        default: '',
      },
      name: {
        type: String,
        default: '',
      },
      control: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      bindProps() {
        const {
          $props, isChildren, rootName, rootValue, rootDisabled
        } = this;
        const p = omit($props, 'label');
        p.type = 'radio';
        if (isChildren) {
          p.name = p.name || rootName;
          p.checked = p.value === rootValue;
          p.disabled = p.disabled !== null ? !!p.disabled : rootDisabled;
        }
        return p;
      },
      bindListeners() {
        const {
          $listeners, isChildren, onInput, onChange, onGroupChange
        } = this;
        const p = { ...$listeners, input: onInput, change: onChange };
        if (isChildren) {
          p.change = (e) => {
            onGroupChange(e.target.value);
          };
        }
        return p;
      },
      classes() {
        const { prefixCls, bindProps: { checked, disabled } } = this;
        return {
          [`${prefixCls}-wrapper`]: true,
          [`${prefixCls}-wrapper-checked`]: checked,
          [`${prefixCls}-wrapper-disabled`]: disabled,
        };
      },
    },
    methods: {
      onInput(val) {
        this.$emit('input', val);
      },
      onChange(e) {
        this.$emit('change', e);
      },
      focus() {
        const { $refs: { radioRef } } = this;
        if (radioRef) {
          radioRef.focus();
        }
      },
      blur() {
        const { $refs: { radioRef } } = this;
        if (radioRef) {
          radioRef.blur();
        }
      },
    },
  };
</script>
