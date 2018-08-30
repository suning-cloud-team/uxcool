import { isFunction } from '@suning/v-utils';
import { buildComponentName } from '../utils';
import { isImageUrl } from './utils';
import Icon from '../icon';
import Tooltip from '../tooltip';
import Progress from '../progress';

export default {
  name: buildComponentName('UploadList'),
  props: {
    prefixCls: {
      type: String,
      default: '',
    },
    listType: {
      type: String,
      default: 'text',
    },
    progressAttr: {
      type: Object,
      default() {
        return {
          strokeWidth: 2,
          hideInfo: true,
        };
      },
    },
    showPreviewIcon: {
      type: Boolean,
      default: true,
    },
    showRemoveIcon: {
      type: Boolean,
      default: true,
    },
    list: {
      type: Array,
      default() {
        return [];
      },
    },
    locale: {
      type: Object,
      default() {
        return {};
      },
    },
    onPreview: {
      type: Function,
      default: null,
    },
  },
  computed: {
    classes() {
      const { prefixCls, listType } = this;
      return {
        [`${prefixCls}-list`]: true,
        [`${prefixCls}-list-${listType}`]: true,
      };
    },
  },
  methods: {
    onRemove(file, e) {
      e.preventDefault();
      this.$emit('remove', file, e);
    },
    handlePreview(file, e) {
      const { onPreview } = this;
      if (!isFunction(onPreview)) {
        return;
      }
      e.preventDefault();
      onPreview(file, e);
    },
    renderList() {
      const {
        prefixCls,
        list,
        listType,
        locale,
        showRemoveIcon,
        showPreviewIcon,
        progressAttr,
        handlePreview,
        onRemove,
      } = this;
      return list.map((file) => {
        const {
          uid, name, status, thumbUrl, url, linkProps, error: fileError, response
        } = file;

        const onBindPreview = handlePreview.bind(this, file);
        const onBindRemove = onRemove.bind(this, file);
        let icon = <Icon type={status === 'uploading' ? 'loading' : 'file'} />;
        if (listType === 'picture' || listType === 'picture-card') {
          if (listType === 'picture-card' && status === 'uploading') {
            icon = <div class={`${prefixCls}-list-item-uploading-text`}>{locale.uploading}</div>;
          } else if (!thumbUrl && !url) {
            icon = <Icon type="picture" class={`${prefixCls}-list-item-thumbnail`} />;
          } else {
            const thumbnail = isImageUrl(file) ? (
              <img src={thumbUrl || url} alt={name} />
              ) : (
              <Icon type="file" class={`${prefixCls}-list-item-icon`} />
            );
            icon = (
              <a
                target="_blank"
                rel="noopener noreferrer"
                class={`${prefixCls}-list-item-thumbnail`}
                href={url || thumbUrl}
                on-click={onBindPreview}
              >
                {thumbnail}
              </a>
            );
          }
        }

        let actions = showRemoveIcon ? (
          <Icon type="close" title={locale.removeFile} on-click={onBindRemove} />
        ) : null;
        if (listType === 'picture-card' && status !== 'uploading') {
          const linkUrl = url || thumbUrl;
          const previewIcon = showPreviewIcon ? (
            <a
              rel="noopener noreferrer"
              target="_blank"
              title={locale.previewFile}
              style={
                linkUrl
                  ? {}
                  : {
                      pointerEvents: 'none',
                      opacity: 0.5,
                    }
              }
              href={linkUrl}
              on-click={onBindPreview}
            >
              <Icon type="eye_o" />
            </a>
          ) : null;
          const removeIcon = showRemoveIcon ? (
            <Icon type="delete_o" title={locale.removeFile} on-click={onBindRemove} />
          ) : null;
          actions = (
            <span class={`${prefixCls}-list-item-actions`}>
              {previewIcon}
              {removeIcon}
            </span>
          );
        }

        const preview =
          url || thumbUrl ? (
            <a
              {...{
                class: `${prefixCls}-list-item-name`,
                attrs: {
                  ...linkProps,
                  href: url || thumbUrl,
                  target: '_blank',
                  rel: 'noopener noreferrer',
                  title: name,
                },
                on: {
                  click: onBindPreview,
                },
              }}
            >
              {name}
            </a>
            ) : (
            <span class={`${prefixCls}-list-item-name`} title={name} on-click={onBindPreview}>
              {name}
            </span>
        );
        const cls = {
          [`${prefixCls}-list-item`]: true,
          [`${prefixCls}-list-item-${file.status}`]: true,
        };

        let message = (fileError && fileError.statusText) || locale.uploadError;
        if (response && typeof response === 'string') {
          message = response;
        }

        let progress = null;
        if (status === 'uploading') {
          progress = (
            <div key="progress" class={`${prefixCls}-list-item-progress`}>
              {'percent' in file ? (
                <Progress
                  {...{
                    props: {
                      ...progressAttr,
                      percentage: file.percent,
                    },
                  }}
                />
              ) : null}
            </div>
          );
        }

        const infoNode = (
          <span>
            {icon}
            {preview}
          </span>
        );
        return (
          <div key={uid} class={cls}>
            <div class={`${prefixCls}-list-item-info`}>
              {status === 'error' ? <Tooltip content={message}>{infoNode}</Tooltip> : infoNode}
            </div>
            {actions}
            {progress}
          </div>
        );
      });
    },
  },
  render() {
    const { classes, renderList } = this;

    return <div class={classes}>{renderList()}</div>;
  },
};
