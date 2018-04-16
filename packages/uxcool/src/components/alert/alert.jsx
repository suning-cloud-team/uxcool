import Icon from '../icon';
import { buildComponentName } from '../utils';

const iconMapping = {
  warning: 'exclamation_circle',
  success: 'ok_circle',
  info: 'info_circle',
  error: 'close_circle',
};
export default {
  name: buildComponentName('Alert'),
  props: {
    prefixCls: {
      type: String,
      default: 'ux-alert',
    },
    banner: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: null,
      validate(val) {
        return ['warning', 'success', 'info', 'error'].indexOf(val) > -1;
      },
    },
    closable: {
      type: Boolean,
      default: false,
    },
    closeText: {
      type: String,
      default: '',
    },
    message: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    showIcon: {
      type: Boolean,
      default: null,
    },
    iconType: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      closed: false,
    };
  },
  computed: {
    isShowIcon() {
      const { banner, showIcon } = this;
      return banner && showIcon !== false ? true : showIcon;
    },
    nType() {
      const { banner, type } = this;
      return banner && type === null ? 'warning' : type || 'info';
    },
    classes() {
      const {
        prefixCls, nType, isShowIcon, banner
      } = this;
      return {
        [prefixCls]: true,
        [`${prefixCls}-${nType}`]: true,
        [`${prefixCls}-no-icon`]: !isShowIcon,
        [`${prefixCls}-banner`]: !!banner,
      };
    },
    icon() {
      const { type, iconType } = this;
      let r = iconMapping.info;

      if (iconType) {
        r = iconType;
      } else if (type in iconMapping) {
        r = iconMapping[type];
      }
      return r;
    },
  },
  methods: {
    onClose(e) {
      const { $refs: { alertRef } } = this;
      this.closed = true;
      if (alertRef) {
        alertRef.style.height = `${alertRef.getBoundingClientRect().height}px`;
      }
      this.$emit('close', e);
    },
    onAfterClose() {
      this.$emit('after-close');
    },
  },
  render() {
    const {
      $slots,
      prefixCls,
      closed,
      classes,
      icon,
      isShowIcon,
      message,
      description,
      closeText,
      closable,
      onClose,
      iconType,
      onAfterClose,
    } = this;
    const desc = $slots.description || description;
    const closeIcon = $slots.closeText || closeText;

    const className = {};
    let nIcon = icon;
    if (desc) {
      className[`${prefixCls}-with-description`] = true;
      if (!iconType) {
        nIcon = `${nIcon}_o`;
      }
    }
    const hasClosable = closeIcon ? true : closable;
    const iconElement = isShowIcon ? <Icon class={`${prefixCls}-icon`} type={nIcon} /> : null;
    const closeElement = hasClosable ? (
      <a on-click={onClose} class={`${prefixCls}-close-icon`}>
        {closeIcon || <Icon type="close" />}
      </a>
      ) : null;

    return (
      <transition name={`${prefixCls}-slide-up`} on-after-leave={onAfterClose}>
        {closed ? null : (
          <div ref="alertRef" class={[classes, className]}>
            {iconElement}
            <span class={`${prefixCls}-message`}>{$slots.message || message}</span>
            <span class={`${prefixCls}-description`}>{desc}</span>
            {closeElement}
          </div>
        )}
      </transition>
    );
  },
};
