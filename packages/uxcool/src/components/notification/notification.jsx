import Vue from 'vue';
import { isVNode, isFunction, isNumber, isPlainObject } from '@suning/v-utils';
import Notification from '@suning/v-notification';
import Icon from '../icon';

const defaultProps = {
  prefixCls: 'ux-notification',
  placement: 'topRight',
  // ms
  duration: 4500,
  top: 24,
  bottom: 24,
  getContainer: null,
  theme: 'light',
};

const iconTypes = {
  success: 'ok_circle_o',
  info: 'info_circle_o',
  warn: 'exclamation_circle_o',
  warning: 'exclamation_circle_o',
  error: 'close_circle_o',
};

let customProps = { ...defaultProps };
let notificationInst = {};

let seed = 0;

function getPlacementStyle(placement) {
  const { top, bottom } = customProps;
  return (
    {
      topLeft: {
        top: `${top}px`,
        left: 0,
      },
      bottomLeft: {
        left: 0,
        bottom: `${bottom}px`,
      },
      bottomRight: {
        right: 0,
        bottom: `${bottom}px`,
      },
    }[placement] || {
      top: `${top}px`,
      right: 0,
    }
  );
}

function getNotificationInstance(pCls, cPlacement) {
  const {
    prefixCls: defaultPrefixCls,
    placement: defaultPlacement,
    theme,
    getContainer,
  } = customProps;
  const prefixCls = pCls || defaultPrefixCls;
  const placement = cPlacement || defaultPlacement;
  const key = `${prefixCls}-${placement}`;
  if (!notificationInst[key]) {
    notificationInst[key] = Notification.newInstance({
      prefixCls,
      notificationClass: [`${prefixCls}-${theme}`, key],
      notificationStyle: getPlacementStyle(placement),
      getContainer,
    });
  }
  return notificationInst[key];
}

function notice({
  prefixCls: pCls,
  className,
  style,
  placement,
  title,
  description,
  dangerouslySetInnerHTML = false,
  btn,
  icon,
  duration = customProps.duration,
  onClose,
  closable = true,
  ...others
}) {
  // eslint-disable-next-line
  const h = this.$createElement;
  const prefixCls = `${pCls || customProps.prefixCls}-notice`;

  let iconElement = null;
  if (typeof icon === 'string' || isVNode(icon) || isPlainObject(icon)) {
    if (isVNode(icon)) {
      iconElement = <span class={`${prefixCls}-icon`}>{icon}</span>;
    } else {
      let iconType = {
        type: '',
        style: {},
      };
      if (typeof icon === 'string') {
        iconType.type = icon;
      } else {
        // plain object
        iconType = { ...iconType, ...icon };
      }
      iconElement = (
        <Icon
          type={iconType.type in iconTypes ? iconTypes[iconType.type] : iconType.type}
          class={[`${prefixCls}-icon`, `${prefixCls}-icon-${iconType.type}`]}
          style={iconType.style}
        />
      );
    }
  }

  const contentElement = (
    <div class={iconElement ? `${prefixCls}-with-icon` : ''}>
      {iconElement}
      <div class={`${prefixCls}-message`}>{title}</div>
      {dangerouslySetInnerHTML ? (
        <div class={`${prefixCls}-description`} domPropsInnerHTML={description} />
      ) : (
        <div class={`${prefixCls}-description`}>{description}</div>
      )}
      {btn ? <span class={`${prefixCls}-btn`}>{btn}</span> : null}
    </div>
  );

  const instance = getNotificationInstance(pCls, placement);
  const props = {
    $$id: `$$id-${(seed += 1)}`,
    props: {
      ...others,
      content: contentElement,
      duration,
      closable,
    },
    className,
    style,
    onClose,
  };

  instance.notice(props);

  return () => {
    instance.remove(props);
  };
}

function destroy() {
  Object.keys(notificationInst).forEach((key) => {
    const inst = notificationInst[key];
    if (inst) {
      inst.destroy();
    }
  });
  notificationInst = {};
}

function setNotificationConfig({
  prefixCls,
  placement,
  duration,
  top,
  bottom,
  getContainer,
  theme,
}) {
  if (prefixCls || isNumber(top) || isNumber(bottom) || isFunction(getContainer) || theme) {
    destroy();
  }

  const props = {};
  if (prefixCls) {
    props.prefixCls = prefixCls;
  }

  if (isNumber(top)) {
    props.top = top;
  }

  if (isNumber(bottom)) {
    props.bottom = bottom;
  }

  if (isFunction(getContainer)) {
    props.getContainer = getContainer;
  }

  if (placement) {
    props.placement = placement;
  }

  if (typeof duration === 'number') {
    props.duration = duration;
  }

  if (theme) {
    props.theme = theme;
  }
  customProps = { ...defaultProps, ...props };
}

const openFn = notice.bind(new Vue());
const notificationInfo = {
  open: openFn,
  config: setNotificationConfig,
  destroy,
};

// success , warn, warning, error, info
Object.keys(iconTypes).forEach((k) => {
  notificationInfo[k] = (args) => {
    openFn({ ...args, icon: k });
  };
});

export default notificationInfo;
