import Pagination from '../../pagination';
import { isFunction } from '../utils';

export default {
  methods: {
    getCurrent(current = 1, total = 0, pageSize = 10) {
      // total > current*pageSize-pageSize, current才是有效的
      if ((current - 1) * pageSize > total) {
        return Math.floor((total - 1) / pageSize) + 1;
      }
      return current;
    },
    setInnerPager(pager) {
      this.innerPager = pager;
    },
    handlePagerChange(current, pageSize) {
      const { pagination, setInnerPager, onPagerOrFiterOrSortChange } = this;
      const pager = { ...this.innerPager, current, pageSize };

      // 表示不能理解，这块估计是把antdesign的属性和uxcool的属性记混了才写出来的
      if (isFunction(pagination.onChange)) {
        pagination.onChange(current, pageSize);
      }
      setInnerPager(pager);
      onPagerOrFiterOrSortChange();
    },
    initPager() {
      const {
        normalizeData,
        size,
        innerPager,
        pagination,
        getCurrent,
        handlePagerChange,
        setInnerPager,
      } = this;
      let pager = {
        size: size !== 'default' ? 'small' : '',
        total: normalizeData.length,
        current: 1,
        pageSize: 10,
        position: 'bottom',
      };
      pager = { ...pager, ...innerPager };
      if (typeof pagination !== 'boolean') {
        pager = { ...pager, ...pagination };
      }
      pager.current = getCurrent(pager.current, pager.total, pager.pageSize);
      /**
       * http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/185
       * 添加pageSizeChange监听
       * */
      pager.on = { change: handlePagerChange, 'page-size-change': handlePagerChange };
      setInnerPager(pager);
    },
    renderPagination(pagerPosition) {
      const {
        prefixCls, theme, hasPagination, innerPager
      } = this;
      if (!hasPagination) {
        return null;
      }

      const {
        position, className, style, on, ...props
      } = innerPager;

      return props.total > 0 && (position === pagerPosition || position === 'both') ? (
        <Pagination
          class={[`${prefixCls}-pagination`, className]}
          style={style}
          theme={theme}
          {...{ props, on }}
        />
      ) : null;
    },
  },
};
