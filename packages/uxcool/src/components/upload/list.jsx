import { isFunction } from '@cloud-sn/v-utils';
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
    showOperateIcon: {
      type: Boolean,
      default: false,
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
    chunk: {
      type: Boolean,
      default: false,
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
    onPause(file, e) {
      e.preventDefault();
      e.stopPropagation();
      this.$emit('pause', file, e);
    },
    onRun(file, e) {
      e.preventDefault();
      e.stopPropagation();
      this.$emit('run', file, e);
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
        onPause,
        onRun,
        onRemove,
        chunk,
        showOperateIcon,
      } = this;
      return list.map((file) => {
        const {
          uid, name, status, thumbUrl, url, linkProps, error: fileError, response
        } = file;

        const onBindPreview = handlePreview.bind(this, file);
        const onBindRemove = onRemove.bind(this, file);
        const onBindPause = onPause.bind(this, file);
        const onBindRun = onRun.bind(this, file);
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

        let opIcon = null;
        if (status !== 'success' && (showOperateIcon || chunk)) {
          opIcon = status === 'uploading' ? (
              <Icon
                title={locale.pause}
                type="pause_circle_o"
                class={`${prefixCls}-list-item-op`}
                on-click={onBindPause}
              />
          ) : (
              <Icon
                title={locale.run}
                type="play_circle_o"
                class={`${prefixCls}-list-item-op`}
                on-click={onBindRun}
              />
          );
        }

        let actions = showRemoveIcon ? (
          <span class={`${prefixCls}-list-item-ops`}>
            {[opIcon, <Icon type="close" title={locale.removeFile} on-click={onBindRemove} />]}
          </span>
        ) : null;
        if (listType === 'picture-card') {
          const cardActions = [];
          let previewIcon = null;
          if (status !== 'uploading') {
            const linkUrl = url || thumbUrl;
            previewIcon = showPreviewIcon ? (
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
            cardActions.push(previewIcon);
          }
          cardActions.push(showRemoveIcon ? (
              <Icon type="delete_o" title={locale.removeFile} on-click={onBindRemove} />
          ) : null);
          actions = <span class={`${prefixCls}-list-item-actions`}>{cardActions}</span>;
        }

        const preview = url || thumbUrl ? (
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
          [`${prefixCls}-list-item-${file.status === 'pause' ? 'uploading' : file.status}`]: true,
        };

        let message = (fileError && fileError.message) || locale.uploadError;
        if (response && typeof response === 'string') {
          message = response;
        }

        let progress = null;
        if (status === 'uploading' || status === 'pause') {
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
