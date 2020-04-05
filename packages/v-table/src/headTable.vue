<template>
  <div :ref="refName"
       :class="`${prefixCls}-header`"
       :style="style"
       @scroll="onScroll"
  >
    <base-table :fixed="fixed"
                has-head
    />
  </div>
</template>
<script>
  import { getRefName } from './utils';
  import SubMixin from './mixins/sub';
  import BaseTable from './baseTable.vue';

  export default {
    name: 'HeadTable',
    components: {
      BaseTable,
    },
    mixins: [SubMixin],
    computed: {
      refName() {
        return getRefName(this.fixed, 'headTableRef');
      },
      style() {
        const {
          isFixedHeader, fixed, scrollBarW, scroll, useFixedHeader
        } = this;
        const style = {};
        /**
         * jsdom 无法正确获取 scrollWidth
         * https://github.com/jsdom/jsdom/issues/1192
         */
        /* istanbul ignore if */
        if (isFixedHeader && !fixed && scrollBarW > 0) {
          style.marginBottom = `-${scrollBarW}px`;
          style.paddingBottom = 0;
          if (useFixedHeader && !scroll.y) {
            style.overflowY = 'hidden';
          }
        }
        return style;
      },
    },
    mounted() {
      const { fixed, $refs, refName } = this;
      if (!fixed) {
        this.saveRef(refName, $refs[refName]);
      }
    },
    methods: {
      onScroll(e) {
        e.stopPropagation();
        if (!this.fixed) {
          this.$emit('head-scroll', e);
        }
      },
    },
  };
</script>
