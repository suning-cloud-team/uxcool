export default {
  prefixCls: {
    type: String,
    default: '',
  },
  component: {
    type: [String, Object],
    default: 'span',
  },
  name: {
    type: String,
    default: 'file',
  },
  action: {
    type: [String, Function],
    default: '',
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  directory: {
    type: Boolean,
    default: false,
  },
  data: {
    type: [Object, Function],
    default: null,
  },
  headers: {
    type: Object,
    default: null,
  },
  accept: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  beforeUpload: {
    type: Function,
    default: null,
  },
  customRequest: {
    type: Function,
    default: null,
  },
  withCredentials: {
    type: Boolean,
    default: false,
  },
  autoUpload: {
    type: Boolean,
    default: true,
  },
  beforeReady: {
    type: Function,
    default: null,
  },
  chunk: {
    type: Boolean,
    default: false,
  },
  // Bytes
  maxChunkSize: {
    type: [String, Number],
    default: 0,
  },
  // Bytes
  uploadedBytes: {
    type: [String, Number, Function],
    default: 0,
  },
};
