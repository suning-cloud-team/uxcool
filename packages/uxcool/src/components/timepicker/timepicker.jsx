import Trigger from '@cloud-sn/v-trigger';
import {
  format as formatFn, setHours, setMinutes, setSeconds
} from 'date-fns';
import { buildComponentName } from '../utils';
import commonProps from './props';
import placements from './placements';
import Panel from './panel';

export default {
  name: buildComponentName('Timepicker'),
  props: {
    ...commonProps,
    prefixCls: {
      type: String,
      default: 'ux-time-picker',
    },
    value: {
      type: Date,
      default: null,
    },
    visible: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    popupAlign: {
      type: Object,
      default: null,
    },
    popupPlacement: {
      type: String,
      default: 'bottomLeft',
    },
    popupClass: {
      type: [String, Object, Array],
      default: '',
    },
    popupStyle: {
      type: Object,
      default: null,
    },
    transition: {
      type: String,
      default: 'slide-up',
    },
    getPopupContainer: {
      type: Function,
      default: null,
    },
    inputName: {
      type: String,
      default: '',
    },
    autocomplete: {
      type: Boolean,
      default: false,
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
    builtinPlacements: {
      type: Object,
      default() {
        return placements;
      },
    },
    openValue: {
      type: Date,
      default() {
        return new Date();
      },
    },
    size: {
      type: String,
      default: '',
      validator(val) {
        return ['small', 'default', 'large', ''].indexOf(val) > -1;
      },
    },
    addon: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      innerValue: null,
      innerOpenValue: null,
      innerVisible: false,
      triggerRef: null,
    };
  },
  computed: {
    isShowHour() {
      const { showHour, format } = this;
      if (format) {
        return ['H', 'h'].some((k) => format.indexOf(k) > -1);
      }
      return showHour;
    },
    isShowMinute() {
      const { showMinute, format } = this;
      if (format) {
        return format.indexOf('m') > -1;
      }
      return showMinute;
    },
    isShowSecond() {
      const { showSecond, format } = this;
      if (format) {
        return format.indexOf('s') > -1;
      }
      return showSecond;
    },
    normlizeFormat() {
      const {
        format, isShowHour, isShowMinute, isShowSecond, use12Hours
      } = this;
      if (format) {
        return format;
      }

      const f = [];
      if (isShowHour) {
        f.push(use12Hours ? 'h' : 'HH');
      }

      if (isShowMinute) {
        f.push('mm');
      }

      if (isShowSecond) {
        f.push('ss');
      }
      const fmt = f.join(':');
      return use12Hours ? `${fmt} A` : fmt;
    },
    formatValue() {
      const { innerValue, normlizeFormat } = this;
      return innerValue ? formatFn(innerValue, normlizeFormat) : '';
    },
    triggerNode() {
      return this.renderTrigger();
    },
    panelProps() {
      const {
        prefixCls,
        normlizeFormat,
        innerValue,
        innerOpenValue,
        innerVisible,
        isShowHour,
        isShowMinute,
        isShowSecond,
      } = this;
      const props = Object.keys(Panel.props).reduce((r, k) => {
        const nr = r;
        nr[k] = this[k];
        return nr;
      }, {});
      return {
        ...props,
        prefixCls: `${prefixCls}-panel`,
        format: normlizeFormat,
        value: innerValue,
        openValue: innerOpenValue,
        visible: innerVisible,
        showHour: isShowHour,
        showMinute: isShowMinute,
        showSecond: isShowSecond,
      };
    },
    triggerClasses() {
      const { prefixCls, size } = this;
      return {
        [prefixCls]: true,
        [`${prefixCls}-${size === 'small' ? 'sm' : 'lg'}`]: size === 'small' || size === 'large',
      };
    },
    popupClasses() {
      const {
        prefixCls, isShowHour, isShowMinute, isShowSecond, use12Hours
      } = this;
      const cnt = [isShowHour, isShowMinute, isShowSecond, use12Hours].filter((v) => !!v).length;

      return {
        [`${prefixCls}-panel`]: true,
        [`${prefixCls}-panel-narrow`]:
          (!isShowHour || !isShowMinute || !isShowSecond) && !use12Hours,
        [`${prefixCls}-panel-column-${cnt}`]: true,
      };
    },
  },
  watch: {
    value(nVal) {
      this.setInnerValue(nVal, false);
    },
    openValue(nVal) {
      if (!this.innerValue) {
        this.innerOpenValue = nVal;
      }
    },
    visible(nVal) {
      this.setInnerVisible(nVal, false);
    },
  },
  created() {
    const {
      openValue, value, visible, setInnerValue, setInnerVisible
    } = this;
    setInnerValue(value, false);
    if (!value) {
      this.innerOpenValue = openValue;
    }
    setInnerVisible(visible, false);
  },
  mounted() {
    const { $refs: { triggerRef } } = this;
    if (triggerRef) {
      this.triggerRef = triggerRef;
    }
  },
  methods: {
    focus() {
      const { $refs: { inputRef } } = this;
      if (inputRef) {
        inputRef.focus();
      }
    },
    blur() {
      const { $refs: { inputRef } } = this;
      if (inputRef) {
        inputRef.blur();
      }
    },
    setInnerValue(value, trigger = true) {
      this.innerOpenValue = value;
      this.innerValue = value;
      if (trigger) {
        this.$emit('input', value, this.formatValue);
        this.$emit('change', value, this.formatValue);
      }
    },
    setInnerVisible(visible, trigger = true) {
      this.innerVisible = visible;
      if (trigger) {
        this.$emit('popup-visible-change', visible);
      }
    },
    onPopupVisibleChange(visible) {
      this.setInnerVisible(visible);
    },
    onKeyDown(e) {
      const { setInnerVisible } = this;
      e.preventDefault();
      if (e.keyCode === 40) {
        setInnerVisible(true);
      }
    },
    onChange(value) {
      this.setInnerValue(value);
    },
    onSelect(type, value) {
      const { innerOpenValue, setInnerValue } = this;
      let nVal = innerOpenValue;

      if (type === 'hour') {
        nVal = setHours(innerOpenValue, value);
      } else if (type === 'minute') {
        nVal = setMinutes(innerOpenValue, value);
      } else if (type === 'second') {
        nVal = setSeconds(innerOpenValue, value);
      }

      setInnerValue(nVal);
    },
    onClear() {
      const { openValue, setInnerValue, setInnerVisible } = this;
      setInnerValue(null);
      this.innerOpenValue = openValue;
      setInnerVisible(false);
    },
    renderTrigger() {
      const {
        prefixCls,
        triggerClasses,
        inputName,
        inputReadonly,
        placeholder,
        autocomplete,
        autofocus,
        formatValue,
        disabled,
        onKeyDown,
      } = this;
      const domProps = {
        value: formatValue,
      };
      const attrs = {
        name: inputName,
        readonly: inputReadonly,
        placeholder,
        autocomplete,
        autofocus,
        disabled,
      };
      const on = {
        keydown: onKeyDown,
      };
      return (
        <span slot="trigger" class={triggerClasses}>
          <input
            {...{
              class: `${prefixCls}-input`,
              domProps,
              attrs,
              on,
              ref: 'inputRef',
            }}
          />
          <span class={`${prefixCls}-icon`} />
        </span>
      );
    },
    renderPopup() {
      const {
        $slots, addon, panelProps, onSelect, onClear, onChange
      } = this;
      const on = {
        change: onChange,
        select: onSelect,
        clear: onClear,
      };
      return (
        <Panel {...{ props: panelProps, on, slot: 'popup' }}>
          <template slot="addon">{$slots.addon || addon}</template>
        </Panel>
      );
    },
  },
  render() {
    const {
      prefixCls,
      innerVisible,
      disabled,
      popupAlign,
      popupClass,
      popupClasses,
      popupStyle,
      builtinPlacements,
      popupPlacement,
      transition,
      getPopupContainer,
      onPopupVisibleChange,
      triggerNode,
      renderPopup,
    } = this;

    const triggerProps = {
      prefixCls: `${prefixCls}-panel`,
      visible: innerVisible,
      actions: disabled ? [] : ['click'],
      popupAlign,
      popupClass: [popupClasses, popupClass],
      popupStyle,
      builtinPlacements,
      popupPlacement,
      popupTransitionName: transition,
      getPopupContainer,
      // destroyPopupOnHide: true,
    };
    const on = {
      'popup-visible-change': onPopupVisibleChange,
    };
    return (
      <Trigger {...{ props: triggerProps, on, ref: 'triggerRef' }}>
        {triggerNode}
        {renderPopup()}
      </Trigger>
    );
  },
};
