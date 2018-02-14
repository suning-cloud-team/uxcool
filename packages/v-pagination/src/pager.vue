<template>
  <li :title="title"
      :class="classes">
    <slot></slot>
  </li>
</template>

<script>
  export default {
    name: 'Pager',
    props: {
      rootPrefixCls: String,
      page: Number,
      showTitle: {
        type: Boolean,
        default: true,
      },
      active: {
        type: Boolean,
        default: false,
      },
      className: String,
    },
    computed: {
      prefixCls() {
        return `${this.rootPrefixCls}-item`;
      },
      title() {
        return this.showTitle ? this.page : null;
      },
      classes() {
        const prefixCls = this.prefixCls;
        return {
          [prefixCls]: true,
          [`${prefixCls}-${this.page}`]: true,
          [`${prefixCls}-active`]: this.active,
          [this.className]: !!this.className,
        };
      },
    },
  };
</script>
