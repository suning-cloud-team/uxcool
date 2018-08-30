import { isXHRFileUpload } from '../utils';
import AjaxUploader from './ajaxUploader';
import Props from './props';

export default {
  name: 'Uploader',
  props: {
    ...Props,
    supportServerRender: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    uploaderCmp() {
      return isXHRFileUpload ? AjaxUploader : AjaxUploader;
    },
    bindProps() {
      const { $props } = this;
      return {
        ...$props,
      };
    },
    bindListeners() {
      const { $listeners } = this;
      return {
        ...$listeners,
      };
    },
  },
  methods: {
    abort(file) {
      const { $refs: { uploaderRef } } = this;
      if (uploaderRef) {
        uploaderRef.abort(file);
      }
    },
    upload(file, files) {
      const { $refs: { uploaderRef } } = this;
      if (uploaderRef) {
        uploaderRef.upload(file, files);
      }
    },
  },
  render() {
    const {
      $slots: { default: slotDefault },
      bindProps,
      bindListeners,
      uploaderCmp: UploaderCmp,
    } = this;
    return (
      <UploaderCmp {...{ props: bindProps, on: bindListeners, ref: 'uploaderRef' }}>
        {slotDefault}
      </UploaderCmp>
    );
  },
};
