<template>
  <checkbox :disabled="disabled" />
</template>

<script>
  import { buildComponentName } from '../utils';
  import SubMixin from './mixins/sub';
  import Checkbox from '../checkbox';

  export default {
    name: buildComponentName('SelectionCheckboxAll'),
    components: {
      Checkbox,
    },
    mixins: [SubMixin],
    props: {
      data: {
        type: Array,
        default() {
          return [];
        },
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      selections: {
        type: [Array, Boolean],
        default: true,
      },
      hideDefaultSelections: {
        type: Boolean,
        default: false,
      },
      getPopupContainer: {
        type: Function,
        default() {},
      },
    },
    computed: {
      normalizeData() {
        return this.data.filter(v => !v.$$_checkboxDisable);
      },
    },
  };
</script>

