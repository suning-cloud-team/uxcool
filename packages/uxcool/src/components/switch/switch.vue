<template>
  <span ref="switchRef"
        :class="classes"
        :tabindex="sTabIndex"
        @click="onClick"
        @mouseup="onMouseup">

    <span :class="`${prefixCls}-inner`">
      <slot v-if="innerChecked"
            name="checkedChildren">
        {{ checkedChildren }}
      </slot>
      <slot v-else
            name="uncheckedChildren">
        {{ uncheckedChildren }}
      </slot>
    </span>

  </span>
</template>


<script>
  import { buildComponentName } from '../utils';

  export default {
    name: buildComponentName('Switch'),
    model: {
      prop: 'checked',
    },
    props: {
      prefixCls: {
        type: String,
        default: 'ux-switch',
      },
      size: {
        type: String,
        default: 'default',
        validator(val) {
          return ['small', 'default', 'large'].indexOf(val) > -1;
        },
      },
      checked: {
        type: Boolean,
        default: false,
      },
      checkedChildren: {
        type: String,
        default: '',
      },
      uncheckedChildren: {
        type: String,
        default: '',
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      loading: {
        type: Boolean,
        default: false,
      },
      tabindex: {
        type: String,
        default: '',
      },
      autofocus: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        innerChecked: false,
      };
    },
    computed: {
      classes() {
        const {
          prefixCls, size, loading, innerChecked, disabled
        } = this;
        return {
          [prefixCls]: true,
          [`${prefixCls}-small`]: size === 'small',
          [`${prefixCls}-loading`]: loading,
          [`${prefixCls}-checked`]: innerChecked,
          [`${prefixCls}-disabled`]: disabled,
        };
      },
      sTabIndex() {
        const { tabindex, disabled } = this;
        return disabled ? '-1' : tabindex || 0;
      },
    },
    watch: {
      checked(nVal) {
        this.setChecked(nVal, false);
      },
    },
    created() {
      this.setChecked(this.checked, false);
    },
    mounted() {
      const { autofocus, disabled, focus } = this;
      if (autofocus && !disabled) {
        focus();
      }
    },
    methods: {
      focus() {
        const { $refs: { switchRef } } = this;
        if (switchRef) {
          switchRef.focus();
        }
      },
      blur() {
        const { $refs: { switchRef } } = this;
        if (switchRef) {
          switchRef.blur();
        }
      },
      setChecked(checked, flag = true) {
        const { disabled } = this;
        if (!disabled || (disabled && !flag)) {
          this.innerChecked = !!checked;
        }
        if (flag) {
          // support v-model
          this.$emit('input', this.innerChecked);
          this.$emit('change', this.innerChecked);
        }
      },
      onClick() {
        const { innerChecked } = this;
        const checked = !innerChecked;
        this.setChecked(checked);
        this.$emit('click', checked);
      },
      onMouseup(e) {
        const { blur } = this;
        blur();
        this.$emit('mouseup', e);
      },
    },
  };
</script>
