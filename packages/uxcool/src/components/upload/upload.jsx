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
        return ['select', 'drag'].indexOf(val) > -1;
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
      dragState: 'drop',
      globalDragEvents: null,
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
    dragClasses() {
      const {
        prefixCls, dragState, innerFileList, disabled
      } = this;
      const dragCls = `${prefixCls}-drag`;
      return {
        [prefixCls]: true,
        [`${prefixCls}-disabled`]: disabled,
        [dragCls]: true,
        [`${dragCls}-hover`]: dragState === 'dragover',
        [`${dragCls}-uploading`]: innerFileList.some(file => file.status === 'uploading'),
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
    getWaitUploadOriginFiles() {
      const { innerFileList } = this;
      return innerFileList.filter(file => file.status === 'ready').map(file => file.originFile);
    },
    uploadFile(file) {
      const { $refs: { uploaderRef }, innerFileList, getWaitUploadOriginFiles } = this;
      if (uploaderRef) {
        const waitUploadOriginFiles = getWaitUploadOriginFiles();
        let originFile = file;

        if (typeof originFile === 'string') {
          const filterFiles = innerFileList.filter(v => v.uid === originFile);
          originFile = filterFiles.length > 0 ? filterFiles[0].originFile : null;
        }

        const fileType = toString.call(originFile);
        // ajax 上传必须是 File,
        // iframe上传
        if (fileType === '[object File]') {
          uploaderRef.upload(file, waitUploadOriginFiles);
        }
      }
    },
    submit() {
      const { uploadFile, getWaitUploadOriginFiles } = this;
      const waitUploadOriginFiles = getWaitUploadOriginFiles();
      waitUploadOriginFiles.forEach((file) => {
        uploadFile(file);
      });
    },
    abort(file) {
      const { $refs: { uploaderRef }, chunk } = this;
      const { chunkId, uid } = file;
      if (uploaderRef && ((chunk && chunkId) || (!chunk && uid))) {
        uploaderRef.abort(chunk ? chunkId : uid);
      }
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
        onChange({ file: { ...nFile }, fileList: [...innerFileList] });
      }
    },
    onSuccess(response, file) {
      const { innerFileList, onChange } = this;
      const nFile = getFile(file, innerFileList);
      if (nFile) {
        nFile.status = 'success';
        nFile.response = response;
        const changedFile = { ...nFile };
        const fileList = [...innerFileList];
        onChange({ file: changedFile, fileList });
        this.$emit('success', response, changedFile, fileList);
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
        const fileList = [...innerFileList];
        onChange({ file: changedFile, fileList });
        this.$emit('error', error, response, changedFile, fileList);
      }
    },
    onProgress(e, file) {
      const { innerFileList, onChange } = this;
      const nFile = getFile(file, innerFileList);
      if (nFile) {
        nFile.percent = e.percent;
        const changedFile = { ...nFile };
        const fileList = [...innerFileList];
        onChange({
          event: e,
          file: changedFile,
          fileList,
        });
        this.$emit('progress', e, changedFile, fileList);
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
    onDrop(e) {
      e.preventDefault();
      e.stopPropagation();
      this.dragState = e.type;
      e.dataTransfer.dropEffect = 'move';
    },
    onChunkSend(chunk) {
      const { innerFileList } = this;
      const { file, chunkId } = chunk;
      const nFile = getFile(file, innerFileList);
      if (nFile) {
        nFile.chunkId = chunkId;
      }
      this.$emit('chunk-send', chunk);
    },
    onChunkSuccess(response, chunk) {
      this.$emit('chunk-success', response, chunk);
    },
    onChunkError(err, response, chunk) {
      this.$emit('chunk-error', err, response, chunk);
    },
    onPause(file) {
      const {
        $refs: { uploaderRef }, innerFileList, onChange, chunk
      } = this;
      const nFile = file;
      if (nFile) {
        const { uid, chunkId } = nFile;
        if (uploaderRef && ((chunk && chunkId) || (!chunk && uid))) {
          uploaderRef.abort(chunk ? chunkId : uid);
          const changedFile = { ...nFile };
          const fileList = [...innerFileList];
          nFile.status = 'pause';
          onChange({ file: changedFile, fileList });
          this.$emit('pause', changedFile, fileList);
        }
      }
    },
    onRun(file) {
      const {
        $refs: { uploaderRef },
        innerFileList,
        chunk,
        data,
        uploadedBytes,
        uploadFile,
        onChange,
      } = this;
      const nFile = file;

      if (uploaderRef && nFile) {
        const { originFile, size: fileSize } = nFile;
        nFile.status = 'uploading';
        if (chunk) {
          Promise.resolve(isFunction(data) ? data(originFile) : data).then((formData) => {
            const ubytesRet = isFunction(uploadedBytes)
              ? uploadedBytes(originFile, formData)
              : uploadedBytes;
            Promise.resolve(ubytesRet).then((ubytes) => {
              const ub = Number(ubytes) || 0;
              if (ub >= fileSize) {
                nFile.status = 'error';
                nFile.error = new Error('uplodedbytes > file.size');
                return;
              }
              // eslint-disable-next-line
              nFile.percent = ub / fileSize * 100;
              uploadFile(originFile);
            });
          });
        } else {
          uploadFile(originFile);
        }
        onChange({ file: { ...nFile }, fileList: [...innerFileList] });
      }
    },
    renderUploadList() {
      const {
        prefixCls,
        listType,
        innerFileList,
        showUploadList,
        locale,
        autoUpload,
        chunk,
        uploadedBytes,
        onRemove,
        onPause,
        onRun,
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
        autoUpload,
        chunk,
        uploadedBytes,
        onPreview,
      };
      const on = {
        remove: onRemove,
        pause: onPause,
        run: onRun,
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
        $slots: { default: slotDefault },
        prefixCls,
        type,
        uploadBtnClasses,
        dragClasses,
        onBeforeUpload,
        onBeforeReady,
        onReady,
        onSuccess,
        onError,
        onProgress,
        onStart,
        onDrop,
        onChunkSuccess,
        onChunkSend,
        onChunkError,
      } = this;
      const props = {
        ...$props,
        beforeUpload: onBeforeUpload,
        beforeReady: onBeforeReady,
      };
      const dragEvent = {
        drop: onDrop,
        dragover: onDrop,
        dragleave: onDrop,
      };
      const on = {
        ready: onReady,
        start: onStart,
        success: onSuccess,
        error: onError,
        progress: onProgress,
        'chunk-send': onChunkSend,
        'chunk-success': onChunkSuccess,
        'chunk-error': onChunkError,
      };
      return type === 'drag' ? (
        <div {...{ class: dragClasses, on: dragEvent }}>
          <Uploader
            {...{
              class: `${prefixCls}-btn`,
              props,
              on,
              ref: 'uploaderRef',
            }}
          >
            <div class={`${prefixCls}-drag-container`}>{slotDefault}</div>
          </Uploader>
        </div>
        ) : (
        <span v-show={!!slotDefault} {...{ class: uploadBtnClasses }}>
          <Uploader {...{ props, on, ref: 'uploaderRef' }}>{slotDefault}</Uploader>
        </span>
      );
    },
    renderUpload() {
      const {
        $slots: { tip: slotTip },
        prefixCls,
        listType,
        renderUploadButton,
        renderUploadList,
      } = this;
      const uploadButton = renderUploadButton();
      const uploadList = renderUploadList();

      const tipNode = <div class={`${prefixCls}-tip`}>{slotTip}</div>;
      return (
        <span>
          {listType === 'picture-card'
            ? [uploadList, uploadButton, tipNode]
            : [uploadButton, tipNode, uploadList]}
        </span>
      );
    },
  },
  render() {
    const { renderUpload } = this;
    return renderUpload();
  },
};
