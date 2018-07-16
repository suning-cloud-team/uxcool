export default {
  prefixCls: {
    type: String,
    default: '',
  },
  value: {
    type: Date,
    default: null,
  },
  allowClear: {
    type: Boolean,
    default: true,
  },
  clearText: {
    type: String,
    default: 'clear',
  },
  placeholder: {
    type: String,
    default: '请选择时间',
  },
  format: {
    type: String,
    default: '',
  },
  use12Hours: {
    type: Boolean,
    default: false,
  },
  hourStep: {
    type: [Number, String],
    default: 1,
  },
  minuteStep: {
    type: [Number, String],
    default: 1,
  },
  secondStep: {
    type: [Number, String],
    default: 1,
  },
  showHour: {
    type: Boolean,
    default: true,
  },
  showMinute: {
    type: Boolean,
    default: true,
  },
  showSecond: {
    type: Boolean,
    default: true,
  },
  disabledHours: {
    type: Function,
    default: null,
  },
  disabledMinutes: {
    type: Function,
    default: null,
  },
  disabledSeconds: {
    type: Function,
    default: null,
  },
  hideDisabledOption: {
    type: Boolean,
    default: false,
  },
  inputReadonly: {
    type: Boolean,
    default: false,
  },
  focusOnOpen: {
    type: Boolean,
    default: true,
  },
  // 当value不存在时,设置弹窗默认值
  openValue: {
    type: Date,
    default: null,
  },
};
