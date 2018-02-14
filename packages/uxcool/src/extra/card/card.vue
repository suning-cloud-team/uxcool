<template>
  <div :class="clazz">
    <div :class="headerClass">
      <div :class="titleClass">
        <slot name="title"></slot>
      </div>
      <div :class="actionClass"
           v-if="showAction">
        <slot name="action"></slot>
      </div>
    </div>
    <div class="ux-card-body"
         :style="bodyStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  const prefixCls = 'ux-card';

  export default {
    name: 'UxCard',
    props: {
      theme: {
        type: String,
        default: 'light',
      },
      vertical: Boolean,
      flat: Boolean,
      bodyStyle: Object,
    },
    data() {
      return {
        showAction: false,
      };
    },
    computed: {
      clazz() {
        return [
          `${prefixCls}`,
          `${prefixCls}-${this.theme}`,
          {
            [`${prefixCls}-flat`]: this.flat,
            [`${prefixCls}-vertical`]: this.vertical,
          },
        ];
      },
      headerClass() {
        return [
          `${prefixCls}-header`,
          {
            'with-action': this.showAction,
          },
        ];
      },
      titleClass() {
        return `${prefixCls}-title`;
      },
      actionClass() {
        return `${prefixCls}-action`;
      },
    },
    mounted() {
      this.showAction = !!this.$slots.action;
    },
  };
</script>
