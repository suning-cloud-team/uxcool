<template>
  <div :class="classes">
    <head-table v-if="isFixedHeader&&!hideHeader"
                :fixed="fixed" />

    <body-table :has-head="!isFixedHeader&&!hideHeader"
                :fixed="fixed"
                @body-scroll="onBodyScroll" />

    <template v-if="!fixed">
      <div v-if="records.length === 0"
           :class="`${prefixCls}-placeholder`">
        <slot name="empty" />
      </div>

      <div v-if="$scopedSlots.footer || $slots.footer"
           :class="`${prefixCls}-footer`">
        <slot name="footer"
              :records="records" />
      </div>
    </template>

  </div>
</template>
<script>
  import SubMixin from './mixins/sub';
  import HeadTable from './headTable.vue';
  import BodyTable from './bodyTable';

  export default {
    name: 'MainTable',
    components: {
      HeadTable,
      BodyTable,
    },
    mixins: [SubMixin],
    computed: {
      scrollable() {
        const {
          fixed, scroll, isAnyColumnsFixed, isFixedHeader
        } = this;
        return !fixed && (isAnyColumnsFixed || scroll.x || isFixedHeader);
      },
      classes() {
        const { prefixCls, scrollable } = this;
        return {
          [`${prefixCls}-main-table`]: true,
          [`${prefixCls}-scroll`]: scrollable,
        };
      },
      headTableRef() {
        return this.elementRefs.headTableRef;
      },
      fixedAndBodyTableRefs() {
        const { elementRefs } = this;
        return [
          elementRefs.bodyTableRef,
          elementRefs.leftBodyTableRef,
          elementRefs.rightBodyTableRef,
        ];
      },
    },
    methods: {
      updatePrevScrollLeft(scrollLeft) {
        this.rootVM.updatePrevScrollLeft(scrollLeft);
      },
      updatePrevScrollTop(scrollTop) {
        this.rootVM.updatePrevScrollTop(scrollTop);
      },
      onScrollX(e) {
        const { scroll, prevScrollLeft, headTableRef } = this;
        const { target } = e;
        const { scrollLeft } = target;
        if (scrollLeft !== prevScrollLeft && scroll.x) {
          if (headTableRef && target !== headTableRef) {
            headTableRef.scrollLeft = scrollLeft;
          }
          this.updatePrevScrollLeft(scrollLeft);
          this.$emit('scroll-x', scrollLeft);
        }
      },
      onScrollY(e) {
        const { fixedAndBodyTableRefs, prevScrollTop, scroll } = this;
        const { target } = e;
        const { scrollTop } = target;
        if (scrollTop !== prevScrollTop && scroll.y) {
          fixedAndBodyTableRefs.forEach((ref) => {
            const nRef = ref;
            if (nRef && nRef !== target) {
              nRef.scrollTop = scrollTop;
            }
          });
          this.updatePrevScrollTop(scrollTop);
        }
      },
      onBodyScroll(e) {
        if (e.currentTarget === e.target) {
          if (!this.fixed) {
            this.onScrollX(e);
          }
          this.onScrollY(e);
        }
      },
    },
  };
</script>
