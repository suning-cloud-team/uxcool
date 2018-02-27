<template>
  <radio v-if="type === 'radio'"
         :disabled="disabled"
         @change="onChange" />
  <checkbox v-else
            :disabled="disabled"
            @change="onChange" />
</template>


<script>
  import { buildComponentName } from '../utils';
  import Checkbox from '../checkbox';
  import Radio from '../radio';

  export default {
    name: buildComponentName('selectionCheckbox'),
    components: {
      Checkbox,
      Radio,
    },
    props: {
      type: {
        type: String,
        default: 'checkbox',
      },
      disabled: {
        type: Boolean,
        default: false,
      },
    },
    methods: {
      onChange(e) {
        this.$emit('change', e);
      },
    },
  };
</script>
