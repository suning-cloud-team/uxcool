<template>
  <div :class="classes" />
</template>

<script>
  export default {
    name: 'TimePickerHeader',
    props: {
      prefixCls: { type: String, default: '' },
      value: { type: Date, default: undefined },
    },
    computed: {
      classes() {
        const { prefixCls } = this;
        return {
          [`${prefixCls}-input-wrap`]: true,
        };
      },
    },
  };
</script>
