import { isArray, isPlainObject } from '@cloud-sn/v-utils';
import { buildComponentName } from '../utils';
import Select from '../select';

function handleDataSource(dataSource) {
  if (!isArray(dataSource)) {
    return null;
  }

  return dataSource.map((data) => {
    if (!isPlainObject(data)) {
      return {
        value: data,
        label: data,
      };
    }
    return data;
  });
}
export default {
  name: buildComponentName('Autocomplete'),

  props: {
    prefixCls: {
      type: String,
      default: 'ux-select',
    },
    dataSource: {
      type: Array,
      default: null,
    },
    value: {
      type: [String, Number, Array],
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    allowClear: {
      type: Boolean,
      default: false,
    },
    autoClearSearchValue: {
      type: Boolean,
      default: true,
    },
    placeholder: {
      type: String,
      default: 'Please Select',
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
    dropdownMatchSelectWidth: {
      type: Boolean,
      default: true,
    },
    dropdownMenuStyle: {
      type: Object,
      default: undefined,
    },
    getContainer: {
      type: Function,
      default: null,
    },
    filterOption: {
      type: [Function, Boolean],
      default: false,
    },
    renderLabel: {
      type: Function,
      default: null,
    },
    renderGroupLabel: {
      type: Function,
      default: null,
    },
    lazy: {
      type: [Object, Boolean],
      default: true,
    },
    size: {
      type: String,
      default: '',
      validator(val) {
        return ['', 'large', 'default', 'small'].indexOf(val) > -1;
      },
    },
    optionLabelProp: {
      type: String,
      default: 'children',
      validator(val) {
        return ['value', 'label', 'children'].indexOf(val) > -1;
      },
    },
    notFoundContent: {
      type: [String, Object],
      default: null,
    },
    renderInputElement: {
      type: Function,
      default: null,
    },
  },
  computed: {
    classes() {
      const { prefixCls } = this;
      return {
        [`${prefixCls}-show-search`]: true,
        [`${prefixCls}-auto-complete`]: true,
      };
    },
    normalizeDataSource() {
      return handleDataSource(this.dataSource);
    },
    bindProps() {
      const { $props, normalizeDataSource } = this;
      return {
        ...$props,
        dataSource: normalizeDataSource,
        mode: 'SECRET_COMBOBOX_MODE_DO_NOT_USE',
      };
    },
  },
  methods: {
    onInput(...args) {
      // 保证组件触发input事件, form表单验证时,需要组件自身触发事件
      this.$emit('input', ...args);
    },
    onChange(...args) {
      // 保证组件触发change事件, form表单验证时,需要组件自身触发事件
      this.$emit('change', ...args);
    },
  },
  render() {
    const {
      $slots,
      $scopedSlots,
      $listeners,
      classes,
      bindProps,
      renderInputElement,
      onInput,
      onChange,
    } = this;
    const on = {
      ...$listeners,
      input: onInput,
      change: onChange,
    };
    const slotRenderInputElement = ($slots.renderInputElement || [])[0];
    const getInputElement = slotRenderInputElement
      ? () => slotRenderInputElement
      : renderInputElement;
    return (
      <Select
        {...{
          class: classes,
          props: { ...bindProps, getInputElement },
          on,
          scopedSlots: {
            renderGroupLabel: $scopedSlots.renderGroupLabel,
            renderLabel: $scopedSlots.renderLabel,
          },
        }}
      >
        {$slots.default}
      </Select>
    );
  },
};
