import Vue from 'vue';
import { isNaN, isNumber } from '@suning/v-utils';
import Notification from '@suning/v-notification';
import Icon from '../icon';

const defaultProps = {
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

let customProps = { ...defaultProps };

const Ctor = Vue.extend({
  components: {
    Icon,
  },
});
const render = new Ctor();

function getMessageInstance() {
  const {
    prefixCls, top, transitionName, getContainer, theme
  } = customProps;

  if (!msgInst) {
    msgInst = Notification.newInstance({
      prefixCls,
      notificationClass: [`${prefixCls}-${theme}`],
      notificationStyle: {
        top: isNaN(Number(top)) || top === null || top === '' ? top : `${Number(top)}px`,
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
  duration = customProps.duration,
  onClose,
  dangerouslySetInnerHTML,
  ...other
}) {
  const { prefixCls } = customProps;
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
    theme !== customProps.theme
  ) {
    UxMessage.destroy();
  }
  const props = {};

  if (typeof top !== 'undefined') {
    props.top = top;
  }

  if (isNumber(duration)) {
    props.duration = duration;
  }

  if (typeof getContainer === 'function') {
    props.getContainer = getContainer;
  }

  if (prefixCls) {
    props.prefixCls = prefixCls;
  }

  if (theme) {
    props.theme = theme;
  }

  customProps = { ...defaultProps, ...props };
};

UxMessage.destroy = () => {
  if (msgInst) {
    msgInst.destroy();
    msgInst = null;
  }
};
export default UxMessage;
