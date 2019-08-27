<template>
  <div :class="classes">
    <head-table v-if="isFixedHeader&&!hideHeader"
                :fixed="fixed"
                @head-scroll="onScrollX" />

    <body-table v-if="!virtualScrollMode"
                :has-head="!isFixedHeader&&!hideHeader"
                :fixed="fixed"
                @body-scroll="onBodyScroll" />

    <virtual-body-table v-else
                        :fixed="fixed"
                        @body-scroll="onBodyScroll" />

    <template v-if="!fixed">
      <div v-if="records.length === 0"
           :class="`${prefixCls}-placeholder`">
        <slot name="empty" />
      </div>

      <div v-if="$scopedSlots.footer || $slots.footer"
           :class="`${prefixCls}-footer`">
        <slot :records="records"
              name="footer" />
      </div>
    </template>

  </div>
</template>
<script>
  import SubMixin from './mixins/sub';
  import HeadTable from './headTable.vue';
  import BodyTable from './bodyTable';
  import VirtualBodyTable from './virtualBodyTable';

  export default {
    name: 'MainTable',
    components: {
      HeadTable,
      BodyTable,
      VirtualBodyTable,
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
      bodyTableRef() {
        return this.elementRefs.bodyTableRef;
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
        const {
          scroll, prevScrollLeft, headTableRef, bodyTableRef
        } = this;
        const { target } = e;
        const { scrollLeft } = target;
        if (scrollLeft !== prevScrollLeft && scroll.x) {
          // http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/234
          if (headTableRef && target === bodyTableRef) {
            headTableRef.scrollLeft = scrollLeft;
          } else if (bodyTableRef && target === headTableRef) {
            bodyTableRef.scrollLeft = scrollLeft;
          }
          this.updatePrevScrollLeft(scrollLeft);
          this.$emit('scroll-x', scrollLeft);
        }
      },
      onScrollY(e) {
        const {
          fixedAndBodyTableRefs, prevScrollTop, scroll, virtualScrollMode
        } = this;
        const { target } = e;
        const { scrollTop } = target;
        if (scrollTop !== prevScrollTop && (scroll.y || virtualScrollMode)) {
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
