<template>
  <i :title="title"
     :class="classes"
     @click="onClick">
  </i>
</template>


<script>
  import { buildComponentName } from '../utils';

  export default {
    name: buildComponentName('Icon'),
    props: {
      type: String,
      title: String,
      spin: Boolean,
    },
    computed: {
      classes() {
        const { type, spin } = this;
        return {
          fu: true,
          [`fu-${type}`]: true,
          'fu-spin': !!spin || type === 'loading',
        };
      },
    },
    methods: {
      onClick(e) {
        this.$emit('click', e);
      },
    },
  };
</script>
