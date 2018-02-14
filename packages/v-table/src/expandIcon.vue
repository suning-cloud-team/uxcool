<template>
  <span v-if="isCanExpandRow"
        :class="classes"
        @click.stop.prevent="onExpand" />
  <span v-else-if="needIndentSpaced"
        :class="classes" />
</template>

<script>
  import SubMixin from './mixins/sub';

  export default {
    name: 'ExpandIcon',
    mixins: [SubMixin],
    props: {
      iconPrefixCls: {
        type: String,
        default: '',
      },
      isExpanded: {
        type: Boolean,
        default: false,
      },
      isCanExpandRow: {
        type: Boolean,
        default: false,
      },
      needIndentSpaced: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      classes() {
        const {
          iconPrefixCls: prefixCls, isExpanded, isCanExpandRow, needIndentSpaced
        } = this;
        return {
          [`${prefixCls}-expand-icon`]: true,
          [`${prefixCls}-${isExpanded ? 'expanded' : 'collapsed'}`]: isCanExpandRow,
          [`${prefixCls}-spaced`]: !isCanExpandRow && needIndentSpaced,
        };
      },
    },
    methods: {
      onExpand(e) {
        const { isExpanded } = this;
        this.$emit('expand', e, !isExpanded);
      },
    },
  };
</script>
