import { isFunction, warning } from '@cloud-sn/v-utils';
import { buildComponentName } from '../utils';
import Row from '../grid';
import Pagination from '../pagination';
import Spin from '../spin';

export default {
  name: buildComponentName('List'),
  provide() {
    return {
      listRoot: this,
    };
  },
  inheritAttrs: false,
  props: {
    prefixCls: {
      type: String,
      default: 'ux-list',
    },
    dataSource: {
      type: Array,
      default() {
        return [];
      },
    },
    renderItem: {
      type: Function,
      default: null,
    },
    bordered: {
      type: Boolean,
      default: false,
    },
    grid: {
      type: Object,
      default: null,
    },
    itemLayout: {
      type: String,
      default: '',
      validator(val) {
        return ['vertical', ''].indexOf(val) > -1;
      },
    },
    loading: {
      type: [Boolean, Object],
      default: false,
    },
    pagination: {
      type: [Boolean, Object],
      default: false,
    },
    // rowKey: {
    //   type: [String, Function],
    //   default: 'key',
    // },
    size: {
      type: String,
      default: '',
      validator(val) {
        return ['small', 'default', 'large', ''].indexOf(val) > -1;
      },
    },
    split: {
      type: Boolean,
      default: true,
    },
    header: {
      type: String,
      default: '',
    },
    footer: {
      type: String,
      default: '',
    },
    emptyText: {
      type: String,
      default: '暂无数据',
    },
  },
  data() {
    return {
      innerPager: {},
    };
  },
  computed: {
    spinProps() {
      const { loading } = this;
      return typeof loading === 'boolean' ? { spinning: loading } : loading;
    },
    isLoading() {
      const { spinProps } = this;
      return !!spinProps.spinning;
    },
    classes() {
      const {
        prefixCls, split, bordered, size, grid, itemLayout, isLoading
      } = this;
      return {
        [prefixCls]: true,
        [`${prefixCls}-split`]: split,
        [`${prefixCls}-bordered`]: bordered,
        [`${prefixCls}-${size === 'large' ? 'lg' : 'sm'}`]: size === 'large' || size === 'small',
        [`${prefixCls}-grid`]: !!grid,
        [`${prefixCls}-vertical`]: itemLayout === 'vertical',
        [`${prefixCls}-loading`]: isLoading,
      };
    },
    hasPagination() {
      return !!this.pagination;
    },
    normalizeData() {
      const {
        dataSource,
        hasPagination,
        innerPager: { current, pageSize },
      } = this;
      let data = dataSource;
      if (hasPagination && data.length > pageSize) {
        data = data.slice((current - 1) * pageSize, current * pageSize);
      }
      return data;
    },
    pagerElement() {
      return this.renderPagination();
    },
  },
  watch: {
    pagination: {
      handler() {
        this.initPager();
      },
      deep: true,
    },
    dataSource() {
      this.initPager();
    },
  },
  created() {
    this.initPager();
  },
  methods: {
    setInnerPager(pager) {
      this.innerPager = pager;
    },
    resetPagerCurrent(current = 1, total = 0, pageSize = 10) {
      const max = Math.floor((total - 1) / pageSize) + 1;
      return Math.max(Math.min(current, max), 1);
    },
    onPaginationChange(current, pageSize) {
      const {
        pagination: { onChange },
        innerPager,
        setInnerPager,
      } = this;

      setInnerPager({ ...innerPager, current });

      if (isFunction(onChange)) {
        onChange(current, pageSize);
      }

      this.$emit('pagination-change', current, pageSize);
    },
    initPager() {
      const {
        innerPager,
        size,
        hasPagination,
        pagination,
        dataSource,
        onPaginationChange,
        setInnerPager,
        resetPagerCurrent,
      } = this;
      if (!hasPagination) {
        return;
      }
      let pager = {
        size: size === 'small' ? size : '',
        current: 1,
        pageSize: 10,
        position: 'bottom',
      };

      pager = { ...pager, ...innerPager };
      if (typeof pagination !== 'boolean') {
        pager = { ...pager, ...pagination };
      }

      pager.total = dataSource.length;
      pager.current = resetPagerCurrent(pager.current, pager.total, pager.pageSize);
      pager.on = { change: onPaginationChange };
      setInnerPager(pager);
    },
    getGridPropVal(propName) {
      const { grid } = this;
      if (!grid || !grid[propName]) {
        return undefined;
      }

      return Math.floor(24 / grid[propName]);
    },
    renderEmptyText() {
      const {
        $slots: { emptyText: slotEmptyText },
        prefixCls,
        emptyText,
      } = this;
      return <div class={`${prefixCls}-empty-text`}>{slotEmptyText || emptyText}</div>;
    },
    renderPagination() {
      const { prefixCls, hasPagination, innerPager } = this;
      const pager = { top: null, bottom: null };
      if (!hasPagination) {
        return pager;
      }
      const { position, on, ...pagerProps } = innerPager;
      const pos = [];
      if (position === 'both') {
        pos.push('top', 'bottom');
      } else {
        pos.push(position === 'top' ? 'top' : 'bottom');
      }

      pos.forEach((p) => {
        pager[p] = (
          <div class={`${prefixCls}-pagination`}>
            <Pagination {...{ props: pagerProps, on }} />
          </div>
        );
      });

      return pager;
    },
    renderChildren() {
      const {
        $scopedSlots, grid, renderItem, normalizeData, getGridPropVal
      } = this;

      const renderFn = $scopedSlots.renderItem || renderItem;

      if (!isFunction(renderFn)) {
        if (process.env.NODE_ENV !== 'production') {
          warning(false, 'you need to provide the renderItem slot-scope or render-item prop');
        }
        return null;
      }
      if (normalizeData.length > 0) {
        const gridProp = grid
          ? {
            span: getGridPropVal('column'),
            xs: getGridPropVal('xs'),
            sm: getGridPropVal('sm'),
            md: getGridPropVal('md'),
            lg: getGridPropVal('lg'),
            xl: getGridPropVal('xl'),
          }
          : null;
        return normalizeData.map((item, index) => {
          const content = renderFn({ item, index });
          return grid ? <Row.Col {...{ props: gridProp }}>{content}</Row.Col> : content;
        });
      }

      return null;
    },
  },
  render() {
    const {
      $attrs,
      $slots: {
        header: slotHeader,
        default: slotDefault,
        footer: slotFooter,
        loadMore: slotLoadMore,
      },
      prefixCls,
      classes,
      pagerElement,
      grid,
      spinProps,
      isLoading,
      header,
      footer,
      renderChildren,
      renderEmptyText,
    } = this;
    const headerElement = slotHeader || header;
    const footerElement = slotFooter || footer;
    let childrenElement = renderChildren();

    if (childrenElement) {
      childrenElement = grid ? <Row gutter={grid.gutter}>{childrenElement}</Row> : childrenElement;
    } else if (!isLoading) {
      childrenElement = renderEmptyText();
    }

    return (
      <div
        {...{
          class: [
            classes,
            {
              [`${prefixCls}-something-after-last-item`]: !!(
                slotLoadMore
                || pagerElement.bottom
                || footerElement
              ),
            },
          ],
          attrs: $attrs,
        }}
      >
        {pagerElement.top}
        {headerElement ? <div class={`${prefixCls}-header`}>{headerElement}</div> : null}
        <Spin {...{ style: 'width:100%', props: spinProps }}>
          {childrenElement}
          {slotDefault}
        </Spin>
        {footerElement ? <div class={`${prefixCls}-footer`}>{footerElement}</div> : null}
        {slotLoadMore || pagerElement.bottom}
      </div>
    );
  },
};
