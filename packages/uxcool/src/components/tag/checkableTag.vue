<template>
  <div :class="classes"
       @click="onChange">
    <slot/>
  </div>
</template>


<script>
  import { buildComponentName } from '../utils';

  export default {
    name: buildComponentName('CheckableTag'),
    props: {
      prefixCls: {
        type: String,
        default: 'ux-tag',
      },
      checked: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      classes() {
        const { prefixCls, checked } = this;
        return {
          [prefixCls]: true,
          [`${prefixCls}-checkable`]: true,
          [`${prefixCls}-checkable-checked`]: checked,
        };
      },
    },
    methods: {
      onChange() {
        const { checked } = this;
        this.$emit('change', !checked);
      },
    },
  };
</script>
