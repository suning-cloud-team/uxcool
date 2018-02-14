import Vue from 'vue';
import Notification from '@suning/v-notification';
import Icon from '../icon';

let defaultProps = {
  // ms
  duration: 1500,
  top: undefined,
  prefixCls: 'ux-message',
  theme: 'light',
  transitionName: 'move-up',
  getContainer: null,
};
// ms
let seed = 0;
let msgInst = null;

const MESSAGE_TYPES = [
  {
    type: 'info',
    icon: 'info_circle',
  },
  {
    type: 'success',
    icon: 'ok_circle',
  },
  {
    type: 'error',
    icon: 'close_circle',
  },
  {
    type: 'warning',
    icon: 'exclamation_circle',
  },
  {
    type: 'warn',
    icon: 'exclamation_circle',
  },
  {
    type: 'loading',
    icon: 'loading',
  },
];

const Ctor = Vue.extend({
  components: {
    Icon,
  },
});
const render = new Ctor();

function getMessageInstance() {
  const {
    prefixCls, top, transitionName, getContainer, theme
  } = defaultProps;

  if (!msgInst) {
    msgInst = Notification.newInstance({
      prefixCls,
      notificationClass: [`${prefixCls}-${theme}`],
      notificationStyle: {
        top,
      },
      transitionName,
      getContainer,
    });
  }
  return msgInst;
}

function notice({
  iconType,
  type,
  content = '',
  duration = defaultProps.duration,
  onClose,
  dangerouslySetInnerHTML,
  ...other
}) {
  const { prefixCls } = defaultProps;
  const instance = getMessageInstance();
  const h = render.$createElement; // eslint-disable-line no-unused-vars
  const contentVNode = (
    <div class={[`${prefixCls}-custom-content`, `${prefixCls}-${type}`]}>
      <icon type={iconType} />
      {dangerouslySetInnerHTML ? <span domPropsInnerHTML={content} /> : <span>{content}</span>}
    </div>
  );
  const props = {
    $$id: `$$id-${(seed += 1)}`,
    props: {
      ...other,
      content: contentVNode,
      duration,
    },
    onClose,
  };
  instance.notice(props);

  return () => {
    instance.remove(props);
  };
}

const UxMessage = MESSAGE_TYPES.reduce((r, v) => {
  const nr = r;
  nr[v.type] = function handle(params = {}) {
    let nParams = params;
    if (typeof nParams === 'string') {
      nParams = {
        content: nParams,
      };
    }
    nParams.type = v.type;
    nParams.iconType = v.icon;
    return notice(nParams);
  };
  return r;
}, {});

UxMessage.config = ({
  prefixCls, getContainer, top, duration, theme
}) => {
  if (
    prefixCls ||
    typeof getContainer === 'function' ||
    typeof top !== 'undefined' ||
    theme !== defaultProps.theme
  ) {
    UxMessage.destroy();
  }
  const customProps = {
    top,
    duration,
  };

  if (typeof getContainer === 'function') {
    customProps.getContainer = getContainer;
  }
  if (prefixCls) {
    customProps.prefixCls = prefixCls;
  }

  if (theme) {
    customProps.theme = theme;
  }

  defaultProps = { ...defaultProps, ...customProps };
};

UxMessage.destroy = () => {
  if (msgInst) {
    msgInst.destroy();
    msgInst = null;
  }
};
export default UxMessage;
