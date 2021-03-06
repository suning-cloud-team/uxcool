import {
  isFunction, isEqual, warning, isDef, isPlainObject
} from '@cloud-sn/v-utils';
import { buildComponentName } from '../utils';
import List from './list';
import Button from '../button';

export default {
  name: buildComponentName('Transfer'),
  model: {
    prop: 'targetKeys',
  },
  props: {
    prefixCls: {
      type: String,
      default: 'ux-transfer',
    },
    dataSource: {
      type: Array,
      default() {
        return [];
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    targetKeys: {
      type: Array,
      default() {
        return [];
      },
    },
    selectedKeys: {
      type: Array,
      default() {
        return [];
      },
    },
    renderItem: {
      type: Function,
      default: undefined,
    },
    listStyle: {
      type: Object,
      default: undefined,
    },
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
    operations: {
      type: Array,
      default() {
        return [];
      },
    },
    showSearch: {
      type: Boolean,
      default: false,
    },
    filterOption: {
      type: Function,
      default: null,
    },
    searchPlaceholder: {
      type: String,
      default: '请输入搜索内容',
    },
    notFoundContent: {
      type: String,
      default: 'Not Found',
    },
    rowKey: {
      type: [Function, String],
      default: undefined,
    },
    lazy: {
      type: [Object, Boolean],
      default: true,
    },
    order: {
      type: String,
      default: 'original',
      validator(val) {
        return ['original', 'push', 'unshift'].indexOf(val) > -1;
      },
    },
    sort: {
      type: String,
      default: 'ltr',
      validator(val) {
        return ['ltr', 'rtl'].indexOf(val) > -1;
      },
    },
  },
  data() {
    return {
      innerTargetKeys: [],
      leftSelectedKeys: [],
      rightSelectedKeys: [],
    };
  },
  computed: {
    classes() {
      const { prefixCls, disabled } = this;
      return {
        [prefixCls]: true,
        [`${prefixCls}-disabled`]: disabled,
      };
    },
    normalizeDataSource() {
      const {
        dataSource, innerTargetKeys, rowKey, order
      } = this;
      const leftDataSource = [];
      const rightDataSource = [];

      for (let i = 0, l = dataSource.length; i < l; i += 1) {
        const item = dataSource[i];
        let { key } = item;
        if (rowKey) {
          key = isFunction(rowKey) ? rowKey(item) : item[rowKey];
        }
        if (process.env.NODE_ENV !== 'production' && !isDef(key)) {
          warning(
            false,
            'Each record in dataSource of transfer should have a unique `key` prop, or set `rowKey` to an unique primary key'
          );
        }
        item.$$_key = key;
        const tl = innerTargetKeys.length;
        const idx = innerTargetKeys.indexOf(key);
        if (tl > 0 && idx > -1) {
          if (order === 'push' || order === 'unshift') {
            rightDataSource[idx] = item;
          } else {
            rightDataSource.push(item);
          }
        } else {
          leftDataSource.push(item);
        }
      }
      return {
        left: leftDataSource,
        right: rightDataSource,
      };
    },
    disabledItemKeys() {
      const {
        normalizeDataSource: { left, right },
      } = this;

      return [...left, ...right].reduce((r, v) => {
        const nr = r;
        if (v.disabled) {
          nr[v.$$_key] = true;
        }
        return nr;
      }, {});
    },
    listProps() {
      const {
        filterOption,
        showSearch,
        searchPlaceholder,
        notFoundContent,
        titles,
        normalizeDataSource,
        lazy,
        disabled,
      } = this;
      const commonProps = {
        filterOption,
        showSearch,
        searchPlaceholder,
        notFoundContent,
        lazy,
        disabled,
      };

      return ['left', 'right'].reduce((r, k) => {
        const nr = r;
        nr[k] = {
          ...commonProps,
          direction: k,
          title: k === 'left' ? titles[0] : titles[1],
          dataSource: normalizeDataSource[k],
          checkedKeys: this[`${k}SelectedKeys`],
        };
        return nr;
      }, {});
    },
    operationElement() {
      const { renderOperation } = this;
      return renderOperation();
    },
  },
  watch: {
    selectedKeys(nVal, oVal) {
      if (!isEqual(nVal, oVal)) {
        this.setListSelectedKeys();
      }
    },
    targetKeys(nVal, oVal) {
      if (!isEqual(nVal, oVal)) {
        this.innerTargetKeys = nVal;
        this.setListSelectedKeys();
      }
    },
  },
  created() {
    this.innerTargetKeys = this.targetKeys;
    this.setListSelectedKeys();
  },
  methods: {
    setListSelectedKeys() {
      const { selectedKeys, innerTargetKeys } = this;
      const leftSelectedKeys = [];
      const rightSelectedKeys = [];
      for (let i = 0, l = selectedKeys.length; i < l; i += 1) {
        const key = selectedKeys[i];
        if (innerTargetKeys.length > 0 && innerTargetKeys.indexOf(key) > -1) {
          rightSelectedKeys.push(key);
        } else {
          leftSelectedKeys.push(key);
        }
      }

      this.leftSelectedKeys = leftSelectedKeys;
      this.rightSelectedKeys = rightSelectedKeys;
    },
    handleChange(direction, moveKeys) {
      const { innerTargetKeys } = this;
      const keys = [...innerTargetKeys];
      this.$emit('input', keys);
      this.$emit('change', keys, direction, moveKeys);
    },
    handleSelectChange(direction, changedKeys, checked) {
      const { leftSelectedKeys, rightSelectedKeys } = this;
      this.$emit(
        'select-change',
        [...leftSelectedKeys],
        [...rightSelectedKeys],
        direction,
        [...changedKeys],
        checked
      );
    },
    onSelect(direction, key, checked) {
      let selectedKeys = this[`${direction}SelectedKeys`];
      if (checked) {
        selectedKeys.push(key);
      } else {
        selectedKeys = selectedKeys.filter((k) => k !== key);
      }
      this[`${direction}SelectedKeys`] = selectedKeys;
      this.handleSelectChange(direction, [key], checked);
    },
    onSelectAll(direction, changedKeys, checked) {
      let selectedKeys = this[`${direction}SelectedKeys`];

      if (checked) {
        selectedKeys.push(...changedKeys);
      } else {
        selectedKeys = selectedKeys.filter((key) => changedKeys.indexOf(key) === -1);
      }
      this[`${direction}SelectedKeys`] = selectedKeys;
      this.handleSelectChange(direction, changedKeys, checked);
    },
    onScroll(direction, e) {
      this.$emit('scroll', direction, e);
    },
    onSearchChange(direction, val) {
      this.$emit('search-change', direction, val);
    },
    onSearchClear(direction) {
      this.$emit('search-clear', direction);
    },
    moveTo(direction) {
      const {
        order, innerTargetKeys, disabledItemKeys, handleSelectChange, handleChange
      } = this;
      const changeDirection = direction === 'left' ? 'right' : 'left';
      const selectKeys = this[`${changeDirection}SelectedKeys`];

      const moveKeys = selectKeys.filter((k) => !(k in disabledItemKeys));

      let nTargetKeys;
      // 向左移动
      if (direction === 'left') {
        nTargetKeys = innerTargetKeys.filter((k) => moveKeys.indexOf(k) === -1);
      } else {
        nTargetKeys = [...innerTargetKeys];
        moveKeys.forEach((k) => {
          if (nTargetKeys.indexOf(k) === -1) {
            if (order === 'unshift') {
              nTargetKeys.unshift(k);
            } else {
              nTargetKeys.push(k);
            }
          }
        });
      }
      this.innerTargetKeys = nTargetKeys;

      this[`${changeDirection}SelectedKeys`] = selectKeys.filter((k) => k in disabledItemKeys);
      handleSelectChange(changeDirection, moveKeys, false);

      handleChange(direction, moveKeys);
    },

    normalizeOperation(operation) {
      let disabled = false;
      let text = '';

      if (isPlainObject(operation)) {
        ({ disabled, text = '' } = operation);
      } else if (typeof operation === 'string') {
        text = operation;
      }

      return {
        disabled,
        text,
      };
    },
    getValidSelectedKeys(selectedKeys) {
      const { dataSource } = this;
      return selectedKeys.filter((key) => dataSource.some((item) => key === item.$$_key && !item.disabled));
    },
    renderOperation() {
      const {
        prefixCls,
        sort,
        operations,
        leftSelectedKeys,
        rightSelectedKeys,
        moveTo,
        disabled,
        normalizeOperation,
        getValidSelectedKeys,
      } = this;

      // fix issue #175
      const toLeftOp = normalizeOperation(operations[0]);
      const toRightOp = normalizeOperation(operations[1]);

      // http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/292
      const leftDisabled = disabled || toLeftOp.disabled || getValidSelectedKeys(rightSelectedKeys).length === 0;
      const rightDisabled = disabled || toRightOp.disabled || getValidSelectedKeys(leftSelectedKeys).length === 0;

      const opBtns = [
        <Button
          type="primary"
          disabled={leftDisabled}
          size="small"
          icon="left"
          on-click={() => moveTo('left')}
        >
          {toLeftOp.text}
        </Button>,
      ];

      const toRightBtn = (
        <Button
          type="primary"
          disabled={rightDisabled}
          size="small"
          icon="right"
          on-click={() => moveTo('right')}
        >
          {toRightOp.text}
        </Button>
      );

      if (sort === 'ltr') {
        opBtns.push(toRightBtn);
      } else {
        opBtns.unshift(toRightBtn);
      }

      return <div class={`${prefixCls}-operation`}>{opBtns}</div>;
    },
  },
  render() {
    const {
      $slots,
      $scopedSlots,
      classes,
      listStyle,
      renderItem,
      listProps: { left: leftProps, right: rightProps },
      operationElement,
      onSelect,
      onSelectAll,
      onScroll,
      onSearchChange,
      onSearchClear,
    } = this;

    const renderItemFn = $scopedSlots.renderItem || renderItem;

    const leftListProps = {
      ...leftProps,
      renderContent: renderItemFn,
      scopedSlots: $scopedSlots,
    };

    const rightListProps = {
      ...rightProps,
      renderContent: renderItemFn,
    };

    const on = {
      select: onSelect,
      'select-all': onSelectAll,
      scroll: onScroll,
      'search-change': onSearchChange,
      'search-clear': onSearchClear,
    };

    return (
      <div class={classes}>
        <List
          {...{
            style: listStyle,
            props: leftListProps,
            scopedSlots: $scopedSlots,
            on,
          }}
        >
          <template slot="notFoundContent">{$slots.notFoundContent}</template>
          <template slot="footer">{$slots.leftFooter}</template>
        </List>
        {operationElement}
        <List
          {...{
            style: listStyle,
            props: rightListProps,
            scopedSlots: $scopedSlots,
            on,
          }}
        >
          <template slot="notFoundContent">{$slots.notFoundContent}</template>
          <template slot="footer">{$slots.rightFooter}</template>
        </List>
      </div>
    );
  },
};
