<template>
  <div :class="classes">

  </div>
</template>

<script>
  export default {
    name: 'TimePickerHeader',
    props: {
      prefixCls: String,
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