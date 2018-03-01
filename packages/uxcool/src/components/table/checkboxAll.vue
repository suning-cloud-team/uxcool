<template>
  <div :class="classes">
    <checkbox :class="boxClasses"
              :checked="checked"
              :disabled="disabled"
              :indeterminate="indeterminate"
              @change="onChange" />
  </div>
</template>

<script>
  import { buildComponentName } from '../utils';
  import SubMixin from './mixins/sub';
  import Checkbox from '../checkbox';

  const defaultSelections = [
    {
      key: 'all',
      text: '全选当页',
      onSelect: () => {},
    },
    {
      key: 'invert',
      text: '反选当页',
      onSelect: () => {},
    },
  ];

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
      boxPrefixCls() {
        return `${this.prefixCls}-selection`;
      },
      classes() {
        const { boxPrefixCls } = this;
        return {
          [boxPrefixCls]: true,
        };
      },
      boxClasses() {
        const { boxPrefixCls, normalizeSelections } = this;
        return {
          [`${boxPrefixCls}-select-all-custom`]: normalizeSelections.length > 0,
        };
      },
      normalizeSelections() {
        const { selections, hideDefaultSelections } = this;
        const dSelections = hideDefaultSelections ? [] : defaultSelections;
        let ret = [];
        if (selections) {
          if (Array.isArray(selections)) {
            ret = [...dSelections, ...selections];
          } else {
            ret = dSelections;
          }
        }
        return ret;
      },
      checked() {
        const { data, selectedRowKeys } = this;
        return data.every(v => selectedRowKeys.indexOf(v.$$_key) > -1);
      },
      indeterminate() {
        const { selectedRowKeys, data } = this;
        const some = data.some(v => selectedRowKeys.indexOf(v.$$_key) > -1);
        const every = data.every(v => selectedRowKeys.indexOf(v.$$_key) > -1);
        return !every && some;
      },
    },
    methods: {
      onChange(e) {
        const { checked } = e.target;
        this.$emit('change', checked ? 'all' : 'removeAll');
      },
    },
  };
</script>

