import { isEqual, isFunction } from '@suning/v-utils';
import { buildComponentName } from '../utils';
import { normalizeFile, handleFileList, getFile } from './utils';
import Locale from '../locale/lang/default';
import Props from './uploader/props';
import Uploader from './uploader';
import List from './list';

export default {
  name: buildComponentName('Upload'),
  $_veeValidate: {
    value() {
      return this.innerFileList;
    },
  },
  model: {
    prop: 'fileList',
  },
  props: {
    ...Props,
    prefixCls: {
      type: String,
      default: 'ux-upload',
    },
    type: {
      type: String,
      default: 'select',
      validator(val) {
        return ['select'].indexOf(val) > -1;
      },
    },
    fileList: {
      type: Array,
      default() {
        return [];
      },
    },
    showUploadList: {
      type: [Boolean, Object],
      default: true,
    },
    listType: {
      type: String,
      default: 'text',
      validator(val) {
        return ['text', 'picture', 'picture-card'].indexOf(val) > -1;
      },
    },
    beforeRemove: {
      type: Function,
      default: null,
    },
    locale: {
      type: Object,
      default() {
        return Locale.Upload;
      },
    },
    control: {
      type: Boolean,
      default: false,
    },
    onPreview: {
      type: Function,
      default: null,
    },
  },
  data() {
    return {
      innerFileList: [],
    };
  },
  computed: {
    uploadBtnClasses() {
      const { prefixCls, listType, disabled } = this;
      return {
        [prefixCls]: true,
        [`${prefixCls}-select`]: true,
        [`${prefixCls}-select-${listType}`]: true,
        [`${prefixCls}-disabled`]: disabled,
      };
    },
  },
  watch: {
    fileList(nVal) {
      this.setInnerFileList(handleFileList(nVal), true);
    },
  },
  created() {
    const { fileList, setInnerFileList } = this;
    setInnerFileList(handleFileList(fileList), true);
  },
  methods: {
    uploadFile(file, files) {
      const { $refs: { uploaderRef } } = this;
      if (uploaderRef) {
        const fileType = toString.call(file);
        // ajax 上传必须是 File,
        // iframe上传
        if (fileType === '[object File]') {
          uploaderRef.upload(file, files);
        }
      }
    },
    submit() {
      const { innerFileList, uploadFile } = this;

      const waritUploadOriginFiles = innerFileList
        .filter(file => file.status === 'ready')
        .map(file => file.originFile);

      waritUploadOriginFiles.forEach((file) => {
        uploadFile(file, waritUploadOriginFiles);
      });
    },
    setInnerFileList(fileList = [], pass = false) {
      const { innerFileList, control } = this;
      if (!control || pass) {
        if (!isEqual(innerFileList, fileList)) {
          this.innerFileList = fileList;
        }
      }
    },
    onChange(changed = {}) {
      if (!this.control) {
        this.$emit('input', changed.fileList);
      }
      this.$emit('change', changed);
    },
    onReady(file) {
      const { innerFileList, onChange, setInnerFileList } = this;
      const nFile = normalizeFile(file);
      nFile.status = 'ready';
      if (URL.createObjectURL) {
        nFile.thumbUrl = URL.createObjectURL(file);
      }
      const nFileList = [...innerFileList, nFile];
      setInnerFileList(nFileList);
      onChange({ file: { ...nFile }, fileList: nFileList });
    },
    onStart(file) {
      const { innerFileList, onChange } = this;
      const nFile = getFile(file, innerFileList);
      if (nFile) {
        nFile.status = 'uploading';
        onChange({ file: { ...nFile }, fileList: innerFileList });
      }
    },
    onSuccess(response, file) {
      const { innerFileList, onChange } = this;
      const nFile = getFile(file, innerFileList);
      if (nFile) {
        nFile.status = 'success';
        nFile.response = response;
        const changedFile = { ...nFile };
        onChange({ file: changedFile, fileList: innerFileList });
        this.$emit('success', response, changedFile, innerFileList);
      }
    },
    onError(error, response, file) {
      const { innerFileList, onChange } = this;
      const nFile = getFile(file, innerFileList);
      if (nFile) {
        nFile.status = 'error';
        nFile.error = error;
        nFile.response = response;
        const changedFile = { ...nFile };
        onChange({ file: changedFile, fileList: innerFileList });
        this.$emit('error', error, response, changedFile, innerFileList);
      }
    },
    onProgress(e, file) {
      const { innerFileList, onChange } = this;
      const nFile = getFile(file, innerFileList);
      if (nFile) {
        nFile.percent = e.percent;
        const changedFile = { ...nFile };
        onChange({
          event: e,
          file: changedFile,
          fileList: innerFileList,
        });
        this.$emit('progress', e, changedFile, innerFileList);
      }
    },
    onRemove(file) {
      const {
        $refs: { uploaderRef },
        beforeRemove,
        innerFileList,
        onChange,
        setInnerFileList,
      } = this;

      if (uploaderRef) {
        Promise.resolve(isFunction(beforeRemove) ? beforeRemove(file) : true).then((ret) => {
          if (ret === false) {
            return;
          }
          const nFile = file;
          const { uid, thumbUrl } = nFile;
          if (URL.revokeObjectURL && thumbUrl) {
            URL.revokeObjectURL(thumbUrl);
          }
          uploaderRef.abort(nFile);
          nFile.status = 'removed';
          const fileList = innerFileList.filter(v => v.uid !== uid);
          setInnerFileList(fileList);
          const changedFile = { ...nFile };
          onChange({
            file: changedFile,
            fileList,
          });
          this.$emit('remove', changedFile, fileList);
        });
      }
    },
    renderUploadList() {
      const {
        prefixCls,
        listType,
        innerFileList,
        showUploadList,
        locale,
        onRemove,
        onPreview,
      } = this;
      if (showUploadList === false) {
        return null;
      }
      const { showPreviewIcon, showRemoveIcon } =
        typeof showUploadList === 'boolean' ? {} : showUploadList || {};

      const props = {
        prefixCls,
        listType,
        showPreviewIcon,
        showRemoveIcon,
        list: innerFileList,
        locale,
        onPreview,
      };
      const on = {
        remove: onRemove,
      };
      return <List {...{ props, on }} />;
    },
    onBeforeReady(selectedFiles) {
      const { beforeReady, innerFileList } = this;
      if (!isFunction(beforeReady)) {
        return true;
      }

      const before = beforeReady(selectedFiles, innerFileList);

      if (before === false) {
        return false;
      }

      if (before && isFunction(before.then)) {
        return before;
      }

      return true;
    },
    onBeforeUpload(file, files) {
      const { innerFileList, beforeUpload } = this;
      if (!isFunction(beforeUpload)) {
        return true;
      }

      const before = beforeUpload(file, files, innerFileList);

      if (before === false) {
        return false;
      }

      if (before && isFunction(before.then)) {
        return before;
      }

      return true;
    },
    renderUploadButton() {
      const {
        $props,
        $slots: { default: slotDefault, extra: slotExtra },
        uploadBtnClasses,
        onBeforeUpload,
        onBeforeReady,
        onReady,
        onSuccess,
        onError,
        onProgress,
        onStart,
      } = this;
      const props = {
        ...$props,
        beforeUpload: onBeforeUpload,
        beforeReady: onBeforeReady,
      };
      const on = {
        ready: onReady,
        start: onStart,
        success: onSuccess,
        error: onError,
        progress: onProgress,
      };
      return (
        <span class={uploadBtnClasses} v-show={!!slotDefault}>
          <Uploader {...{ props, on, ref: 'uploaderRef' }}>{slotDefault}</Uploader>
          {slotExtra}
        </span>
      );
    },
    renderUpload() {
      const { listType, renderUploadButton, renderUploadList } = this;
      const uploadButton = renderUploadButton();
      const uploadList = renderUploadList();

      return (
        <span>
          {listType === 'picture-card' ? [uploadList, uploadButton] : [uploadButton, uploadList]}
        </span>
      );
    },
  },
  render() {
    const { renderUpload } = this;
    return renderUpload();
  },
};
