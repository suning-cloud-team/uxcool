<template>
  <a role="button"
     :class="classes"
     @click="onClick">
    {{content}}
  </a>
</template>
<script>
  export default {
    name: 'TimePickerButton',
    props: {
      prefixCls: String,
      locale: Object,
      isTimePicker: Boolean,
      disabled: Boolean,
    },
    computed: {
      classes() {
        const { prefixCls, disabled } = this;
        return {
          [`${prefixCls}-time-picker-btn`]: true,
          [`${prefixCls}-time-picker-btn-disabled`]: disabled,
        };
      },
      content() {
        const { locale, isTimePicker } = this;
        return isTimePicker ? locale.dateSelect : locale.timeSelect;
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