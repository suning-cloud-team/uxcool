<template>
  <button :type="type"
          :class="clazz"
          @click="handleClick"
          :disabled="disabled">
    <span>
      <slot></slot>
    </span>
  </button>
</template>

<script>
  import { buildComponentName } from '../utils';
  import Icon from '../icon/index';

  const prefixCls = 'ux-btn';

  export default {
    name: buildComponentName('Button'),
    components: {
      Icon,
    },
    props: {
      // icon: String,
      loading: Boolean,
      disabled: Boolean,
      block: Boolean,
      type: {
        default: 'button',
        validator(value) {
          return ~['button', 'submit', 'reset'].indexOf(value);
        },
      },
      theme: {
        validator(value) {
          return ~['primary', 'default', 'success', 'info', 'warning', 'danger'].indexOf(value);
        },
      },
      shape: {
        validator(value) {
          return ~['circle', 'square', 'oval'].indexOf(value);
        },
      },
      variant: {
        validator(value) {
          return ~['outline', 'inverted'].indexOf(value);
        },
      },
      size: {
        validator(value) {
          return ~['extraSmall', 'small', 'large', 'extraLarge'].indexOf(value);
        },
      },
    },
    computed: {
      clazz() {
        const sizes = {
          extraSmall: 'xs',
          small: 'sm',
          large: 'lg',
          extraLarge: 'xl',
        };

        const sizeCls = sizes[this.size] ? `${prefixCls}-${sizes[this.size]}` : '';

        return [
          `${prefixCls}`,
          `${sizeCls}`,
          {
            [`${prefixCls}-${this.theme}`]: !!this.theme,
            [`${prefixCls}-${this.shape}`]: !!this.shape,
            [`${prefixCls}-loading`]: this.loading,
          },
        ];
      },
    },
    methods: {
      handleClick(e) {
        this.$emit('click', e);
      },
    },
  };
</script>
