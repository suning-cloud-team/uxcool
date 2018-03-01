<template>
  <radio v-if="type === 'radio'"
         :checked="checked"
         :disabled="disabled"
         @change="onChange" />
  <checkbox v-else
            :checked="checked"
            :disabled="disabled"
            @change="onChange" />
</template>


<script>
  import { buildComponentName } from '../utils';
  import SubMixin from './mixins/sub';
  import Checkbox from '../checkbox';
  import Radio from '../radio';

  export default {
    name: buildComponentName('selectionCheckbox'),
    components: {
      Checkbox,
      Radio,
    },
    mixins: [SubMixin],
    props: {
      type: {
        type: String,
        default: 'checkbox',
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      record: {
        type: Object,
        default() {
          return {};
        },
      },
    },
    computed: {
      checked() {
        const { record, selectedRowKeys } = this;
        return selectedRowKeys.indexOf(record.$$_key) > -1;
      },
    },
    methods: {
      onChange(e) {
        this.$emit('change', this.record, e);
      },
    },
  };
</script>
