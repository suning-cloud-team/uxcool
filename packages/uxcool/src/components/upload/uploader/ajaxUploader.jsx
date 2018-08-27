import { isFunction, warning } from '@suning/v-utils';
import { getUID, slice, toString, attrAccept, traverseFileTree } from '../utils';
import Props from './props';
import defaultRequest from './request';

export default {
  name: 'AjaxUploader',
  props: {
    ...Props,
  },
  data() {
    return {
      uid: getUID(),
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
  },
  created() {
    this.reqs = {};
  },
  beforeDestroy() {
    this.abort();
  },
  methods: {
    onClick() {
      const { $refs: { fileInput } } = this;
      if (fileInput) {
        fileInput.click();
      }
    },
    onKeyDown(e) {
      const { keyCode, onClick } = e;
      if (keyCode === 13) {
        onClick();
      }
    },
    onDrop(e) {
      e.preventDefault();

      if (e.type === 'dragover') {
        return;
      }

      if (this.props.directory) {
        traverseFileTree(e.dataTransfer.items, this.uploadFiles, _file =>
          attrAccept(_file, this.props.accept));
      } else {
        const files = Array.prototype.slice
          .call(e.dataTransfer.files)
          .filter(file => attrAccept(file, this.props.accept));
        this.uploadFiles(files);
      }
    },
    onReady(file) {
      this.$emit('ready', file);
    },
    onStart(file) {
      this.$emit('start', file);
    },
    onProgress(e, file) {
      this.$emit('progress', e, file);
    },
    onSuccess(ret, file, xhr) {
      this.$emit('success', ret, file, xhr);
    },
    onError(err, ret, file) {
      this.$emit('error', err, ret, file);
    },
    post(file) {
      const {
        reqs,
        name,
        action,
        data,
        customRequest,
        headers,
        withCredentials,
        onStart,
        onProgress,
        onSuccess,
        onError,
      } = this;
      const promises = [action, data].map(fn => Promise.resolve(isFunction(fn) ? fn(file) : fn));
      Promise.all(promises)
        .then(([formAction, formData]) => {
          const { uid } = file;
          const request = customRequest || defaultRequest;
          reqs[uid] = request({
            action: formAction,
            fileName: name,
            data: formData,
            file,
            headers,
            withCredentials,
            onProgress(e) {
              onProgress(e, file);
            },
            onSuccess(ret, xhr) {
              delete reqs[uid];
              onSuccess(ret, file, xhr);
            },
            onError(err, ret) {
              delete reqs[uid];
              onError(err, ret, file);
            },
          });
          onStart(file);
        })
        .catch((err) => {
          if (process.env.NODE_ENV !== 'production') {
            // eslint-disable-next-line
            console && console.error(' Error: action or data %s', err);
          }
      });
    },
    upload(file, files) {
      const { beforeUpload, post } = this;

      if (!isFunction(beforeUpload)) {
        post(file);
        return;
      }

      const before = beforeUpload(file, files);
      if (before && isFunction(before.then)) {
        before.then(
          (beforeFile) => {
            const beforeFileType = toString.call(beforeFile);
            if (beforeFileType === '[object File]' || beforeFileType === '[object Blob]') {
              // TODO: 使用返回的beforeFile, onReady并没有收集到可能会有会有bug,需修正!! -- hw
              post(beforeFile);
              return;
            }
            post(file);
          },
          (err) => {
            if (process.env.NODE_ENV !== 'production') {
              // eslint-disable-next-line
              console && console.error('Error: before-upload %s', err);
            }
          }
        );
      } else if (before !== false) {
        post(file);
      }
    },
    uploadCheck(files) {
      const { beforeReady } = this;
      return Promise.resolve(isFunction(beforeReady) ? beforeReady(files) : true).catch((err) => {
        if (process.env.NODE_ENV !== 'production') {
          // eslint-disable-next-line
          console && console.error('Error: before-ready %s', err);
        }
        return false;
      });
    },
    uploadFiles(fileList) {
      const {
        upload, onReady, autoUpload, uploadCheck
      } = this;
      const files = slice.call(fileList);

      uploadCheck(files).then((check) => {
        if (check === false) {
          return;
        }
        files.forEach((file) => {
          const nFile = file;
          nFile.uid = getUID();
          onReady(nFile);
          if (autoUpload) {
            upload(nFile, files);
          }
        });
      });
    },
    replaceFileInput() {
      this.uid = getUID();
    },
    abort(file) {
      const { reqs } = this;
      if (file) {
        let uuid = file;
        if (file && file.uid) {
          uuid = file.uid;
        }
        if (reqs[uuid]) {
          reqs[uuid].abort();
          delete reqs[uuid];
        }
      } else {
        Object.keys(reqs).forEach((uid) => {
          if (reqs[uid]) {
            reqs[uid].abort();
          }

          delete reqs[uid];
        });
      }
    },
    onChange(e) {
      const { replaceFileInput, uploadFiles } = this;
      const { files } = e.target;
      uploadFiles(files);
      replaceFileInput();
    },
  },
  render() {
    const {
      $slots: { default: slotDefault },
      classes,
      disabled,
      component: CMP,
      uid,
      accept,
      directory,
      multiple,
      onClick,
      onKeyDown,
      onDrop,
      onChange,
    } = this;

    const on = disabled
      ? {}
      : {
        click: onClick,
        keydown: onKeyDown,
        drop: onDrop,
        dropover: onDrop,
    };

    const inputAttrs = {
      type: 'file',
      accept,
      directory: !!directory,
      webkitdirectory: !!directory,
      multiple,
    };
    const inputOn = {
      change: onChange,
    };

    return (
      <CMP
        {...{
          class: classes,
          attrs: { role: 'button', tabindex: 0 },
          on,
        }}
      >
        <input
          v-show={false}
          {...{
            key: uid,
            attrs: inputAttrs,
            on: inputOn,
            ref: 'fileInput',
          }}
        />
        {slotDefault}
      </CMP>
    );
  },
};
