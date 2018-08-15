<template>
  <!-- simple -->
  <ul v-if="simple"
      :class="[simpleClasses,className]">
    <li v-if="showBeforeTotal !== noop"
        :class="beforeTotalClasses"
        v-html="beforeTotalLiteral" />
    <li :title="genTitle(locale.prev_page)"
        tabindex="0"
        :class="prevClasses"
        @click="prev"
        @keypress.enter="prev"
        v-html="itemRender(prevPageNo, 'prev')" />
    <li :class="simpleSepClasses" />
    <li :title="genTitle(locale.next_page)"
        tabindex="0"
        :class="nextClasses"
        @click="next"
        @keypress.enter="next"
        v-html="itemRender(nextPageNo,'next')" />
  </ul>
  <ul v-else
      :class="[classes,className]"
      :style="styles"
      unselectable="unselectable">

    <li v-if="showBeforeTotal !== noop"
        :class="beforeTotalClasses"
        v-html="beforeTotalLiteral" />

    <li :title="genTitle(locale.prev_page)"
        tabindex="0"
        :class="prevClasses"
        @click="prev"
        @keypress.enter="prev"
        v-html="itemRender(prevPageNo, 'prev')" />
    <template v-for="(item,idx) in pagers">
      <li v-if="item.type === 'jump'"
          :title="item.title"
          tabindex="0"
          :class="item.classes"
          @click="item.onClick"
          @keypress="item.onKeyPress"
          v-html="itemRender(item.getPage(), `jump-${item.key}`)" />
      <pager v-if="item.type==='pager'"
             :page="item.page"
             :active="item.active"
             :show-title="item.showTitle"
             :root-prefix-cls="item.prefixCls"
             :class-name="item.classes"
             @click.native="item.onClick"
             @keypress.native.enter="item.onKeyPress"
             v-html="itemRender(item.page, 'page')" />
    </template>
    <li :title="genTitle(locale.next_page)"
        tabindex="0"
        :class="nextClasses"
        @click="next"
        @keypress.enter="next"
        v-html="itemRender(nextPageNo,'next')" />
    <li v-if="showAfterTotal !== noop"
        :class="afterTotalClasses"
        v-html="afterTotalLiteral" />

    <options :root-prefix-cls="prefixCls"
             :have-quick-jumper="showQuickJumper"
             :locale="locale"
             :current="pageNo"
             :have-confirm-btn="showQuickJumperConfirmBtn"
             @on-quick-jumper="handleChange" />
  </ul>

</template>

<script>
  import Pager from './pager.vue';
  import Options from './options.vue';

  const locale = {
    items_per_page: '条/页',
    jump_to: '跳至',
    page: '页',

    prev_page: '上一页',
    next_page: '下一页',
    prev_5: '向前 5 页',
    next_5: '向后 5 页',
    prev_3: '向前 3 页',
    next_3: '向后 3 页',
    confirm: '确定',
  };
  function defaultItemRender(page, type) {
    return `<a>${type === 'page' ? page : ''}</a>`;
  }

  function noop() {}

  function isInteger(val) {
    return typeof val === 'number' && Number.isFinite(val) && Math.floor(val) === val;
  }
  const pagerTpl = {
    type: 'pager',
    prefixCls: '',
    onClick: noop,
    onKeyPress: noop,
    key: 1,
    page: 1,
    active: false,
    showTitle: true,
  };

  export default {
    name: 'Pagination',
    components: {
      Pager,
      Options,
    },
    props: {
      prefixCls: {
        type: String,
        default: 'ux-pagination',
      },
      styles: {
        type: Object,
        default: null,
      },
      className: String,
      size: {
        type: String,
        default: '',
      },
      simple: {
        type: Boolean,
        default: false,
      },
      current: {
        type: Number,
        default: 1,
      },
      total: {
        type: Number,
        required: true,
        default: 0,
      },
      pageSize: {
        type: Number,
        default: 10,
      },
      showSizeChanger: {
        type: Boolean,
        default: false,
      },
      onShowSizeChange: {
        type: Function,
        default: noop,
      },
      showLessItems: {
        type: Boolean,
        default: false,
      },
      selectComponentClass: Object,
      showQuickJumper: {
        type: Boolean,
        default: false,
      },
      showQuickJumperConfirmBtn: {
        type: Boolean,
        default: true,
      },
      showTitle: {
        type: Boolean,
        default: true,
      },
      pageSizeOptions: Array,
      showBeforeTotal: {
        type: Function,
        default: noop,
      },
      showAfterTotal: {
        type: Function,
        default: noop,
      },
      itemRender: {
        type: Function,
        default: defaultItemRender,
      },
    },
    data() {
      const { prefixCls, showLessItems, genTitle } = this;
      return {
        noop,
        pageNo: +this.current,
        prevPageNo: 0,
        nextPageNo: 0,
        usedPageSize: this.pageSize,
        locale,
        prevDisabled: false,
        nextDisabled: false,
        pageBufferSize: this.showLessItems ? 1 : 2,
        pagers: [],
        jumpPrevObj: {
          type: 'jump',
          title: genTitle(showLessItems ? locale.prev_3 : locale.prev_5),
          key: 'prev',
          classes: `${prefixCls}-jump-prev`,
          onClick: this.jumpPrev,
          onKeyPress: this.jumpPrev,
          getPage: this.getJumpPrevPage,
        },
        jumpNextObj: {
          type: 'jump',
          title: genTitle(showLessItems ? locale.next_3 : locale.next_5),
          key: 'next',
          classes: `${prefixCls}-jump-next`,
          onClick: this.jumpNext,
          onKeyPress: this.jumpNext,
          getPage: this.getJumpNextPage,
        },
      };
    },
    computed: {
      simpleClasses() {
        const { prefixCls } = this;
        return {
          [prefixCls]: true,
          [`${prefixCls}-simple`]: true,
        };
      },
      simpleSepClasses() {
        const { prefixCls } = this;
        return {
          [`${prefixCls}-sep`]: true,
        };
      },
      beforeTotalClasses() {
        const { prefixCls } = this;
        return {
          [`${prefixCls}-before-total-text`]: true,
        };
      },
      afterTotalClasses() {
        const { prefixCls } = this;
        return {
          [`${prefixCls}-after-total-text`]: true,
        };
      },
      prevClasses() {
        const { prefixCls } = this;
        return {
          [`${prefixCls}-prev`]: true,
          [`${prefixCls}-disabled`]: this.prevDisabled,
        };
      },
      nextClasses() {
        const { prefixCls } = this;
        return {
          [`${prefixCls}-next`]: true,
          [`${prefixCls}-disabled`]: this.nextDisabled,
        };
      },
      classes() {
        const { prefixCls } = this;
        return {
          [prefixCls]: true,
          [`${prefixCls}-mini`]: this.size === 'small',
        };
      },
      totalPage() {
        const { usedPageSize: pageSize, total } = this;
        return Math.floor((total - 1) / pageSize) + 1;
      },
      beforeTotalLiteral() {
        return this.genTotalLiteral(this.showBeforeTotal);
      },
      afterTotalLiteral() {
        return this.genTotalLiteral(this.showAfterTotal);
      },
    },
    watch: {
      pageSize(newVal, val) {
        if (newVal !== val) {
          this.usedPageSize = newVal;
        }
      },
      totalPage() {
        this.reRender();
      },
      current(nVal, oVal) {
        if (nVal && nVal !== oVal) {
          this.pageNo = nVal;
          this.reRender();
        }
      },
    },
    created() {
      this.reRender();
    },
    methods: {
      genTotalLiteral(cb) {
        const {
          total, pageNo, usedPageSize: pageSize, totalPage
        } = this;
        // 当前页对应的条目范围
        const range = [
          pageNo > 0 ? (pageNo - 1) * pageSize + 1 : 0,
          pageNo * pageSize > total ? total : pageNo * pageSize,
        ];
        return cb(total, pageSize, totalPage, pageNo, range);
      },
      genTitle(title) {
        return this.showTitle ? title : '';
      },
      resetPageNo() {
        const { pageNo, totalPage } = this;
        if (pageNo < 1) {
          this.pageNo = 1;
        } else if (pageNo > totalPage) {
          this.pageNo = totalPage;
        } else {
          this.pageNo = pageNo;
        }
      },
      hasPrev() {
        return this.pageNo > 1;
      },
      hasNext() {
        return this.pageNo < this.totalPage;
      },
      jumpPrev() {
        return this.handleChange(this.getJumpPrevPage());
      },
      jumpNext() {
        return this.handleChange(this.getJumpNextPage());
      },
      getJumpPrevPage() {
        const { pageNo, showLessItems } = this;
        return Math.max(1, pageNo - (showLessItems ? 3 : 5));
      },
      getJumpNextPage() {
        const { pageNo, showLessItems, totalPage } = this;
        return Math.min(totalPage, pageNo + (showLessItems ? 3 : 5));
      },
      prev() {
        if (this.hasPrev()) {
          this.handleChange(this.pageNo - 1);
        }
      },
      next() {
        if (this.hasNext()) {
          this.handleChange(this.pageNo + 1);
        }
      },
      handleChange(page) {
        const { totalPage, pageNo, usedPageSize } = this;
        let nPage = page;
        if (!isInteger(page)) {
          return;
        }
        if (nPage === pageNo) return;

        if (nPage < 1) {
          nPage = 1;
        }
        if (nPage > totalPage) {
          nPage = totalPage;
        }

        this.pageNo = nPage;
        this.render();
        this.$emit('change', nPage, usedPageSize);
      },
      render() {
        const {
          simple,
          pageBufferSize,
          totalPage,
          pageNo: current,
          prefixCls,
          showTitle,
          jumpPrevObj,
          jumpNextObj,
          handleChange,
        } = this;
        const list = [];

        this.prevDisabled = !this.hasPrev();
        this.nextDisabled = !this.hasNext();

        // 简单模式 有自身的逻辑
        if (simple) {
          return;
        }

        if (totalPage <= 5 + pageBufferSize * 2) {
          for (let i = 1; i <= totalPage; i += 1) {
            list.push({
              ...pagerTpl,
              ...{
                prefixCls,
                onClick() {
                  handleChange(i);
                },
                onKeyPress() {
                  handleChange(i);
                },
                key: i,
                page: i,
                active: i === current,
                showTitle,
              },
            });
          }
        } else {
          const firstPager = {
            ...pagerTpl,
            ...{
              prefixCls,
              onClick() {
                handleChange(1);
              },
              onKeyPress() {
                handleChange(1);
              },
              key: 1,
              page: 1,
              showTitle,
            },
          };
          const lastPager = {
            ...pagerTpl,
            ...{
              prefixCls,
              onClick() {
                handleChange(totalPage);
              },
              onKeyPress() {
                handleChange(totalPage);
              },
              key: totalPage,
              page: totalPage,
              showTitle,
            },
          };
          let left = Math.max(1, current - pageBufferSize);
          let right = Math.min(totalPage, current + pageBufferSize);

          // 选中开始几位时, 按钮个数保持最少pageBufferSize*2+1个
          if (current < pageBufferSize + 1) {
            right = 1 + pageBufferSize * 2;
          }

          // 选中最后几页时,按钮个数保证最少pageBufferSize*2+1个
          if (current > totalPage - pageBufferSize) {
            left = totalPage - pageBufferSize * 2;
          }

          for (let i = left; i <= right; i += 1) {
            list.push({
              ...pagerTpl,
              ...{
                prefixCls,
                onClick() {
                  handleChange(i);
                },
                onKeyPress() {
                  handleChange(i);
                },
                key: i,
                page: i,
                active: i === current,
                showTitle,
              },
            });
          }

          // 最少4个按钮时才显示 省略条
          if (current >= pageBufferSize * 2 + 1 && current !== 3) {
            list[0].classes = `${prefixCls}-item-after-jump-prev`;
            list.unshift(jumpPrevObj);
          }

          if (current <= totalPage - pageBufferSize * 2 && current !== totalPage - 2) {
            list[list.length - 1].classes = `${prefixCls}-item-after-jump-next`;
            list.push(jumpNextObj);
          }

          if (left !== 1) {
            list.unshift(firstPager);
          }

          if (right !== totalPage) {
            list.push(lastPager);
          }
        }

        this.prevPageNo = current - 1 > 0 ? current - 1 : 1;
        this.nextPageNo = current + 1 > totalPage ? totalPage : current + 1;
        this.pagers = list;
      },
      reRender() {
        const { resetPageNo, render } = this;
        resetPageNo();
        render();
      },
    },
  };
</script>
