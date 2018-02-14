<template>
  <div :ref="refName"
       :class="`${prefixCls}-header`"
       :style="style">
    <base-table has-head
                :fixed="fixed" />
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
  };
</script>
