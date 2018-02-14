<template>
  <a role="button"
     :class="classes"
     @click="onClick">
    {{locale.ok}}
  </a>
</template>

<script>
  export default {
    name: 'OKButton',
    props: {
      prefixCls: String,
      locale: Object,
      disabled: Boolean,
    },
    computed: {
      classes() {
        const { prefixCls, disabled } = this;
        return {
          [`${prefixCls}-ok-btn`]: true,
          [`${prefixCls}-ok-btn-disabled`]: disabled,
        };
      },
    },
    methods: {
      onClick() {
        if (this.disabled) {
          return;
        }
        this.$emit('on-click');
      },
    },
  };
</script>
