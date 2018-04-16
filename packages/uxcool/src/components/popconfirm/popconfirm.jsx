import { buildComponentName } from '../utils';
import Tooltip from '../tooltip';
import Icon from '../icon';
import Button from '../button';

export default {
  name: buildComponentName('Popconfirm'),
  props: {
    ...Tooltip.props,
    prefixCls: {
      type: String,
      default: 'ux-popover',
    },
    title: {
      type: String,
      default: '',
    },
    okText: {
      type: String,
      default: '确定',
      // default: 'Yes',
    },
    okType: {
      type: String,
      default: 'primary',
    },
    cancelText: {
      type: String,
      default: '取消',
      // default: 'No',
    },
    // isTrigger: {
    //   type: Boolean,
    //   default: true,
    // },
  },
  data() {
    return {
      innerVisible: false,
    };
  },
  computed: {
    bindProps() {
      const { $props, innerVisible } = this;

      return {
        ...$props,
        // trigger: isTrigger ? 'click' : 'none',
        trigger: 'click',
        placement: 'top',
        visible: innerVisible,
      };
    },
  },
  methods: {
    setInnerVisible(visible) {
      this.innerVisible = visible;
      this.$emit('visible-change', visible);
    },
    getTitle() {
      const { $slots, title } = this;
      return $slots.title || title;
    },
    onConfirm(e) {
      this.setInnerVisible(false);
      this.$emit('confirm', e);
    },
    onCancel(e) {
      this.setInnerVisible(false);
      this.$emit('cancel', e);
    },
    renderOverlay() {
      const {
        prefixCls, getTitle, okText, okType, cancelText, onConfirm, onCancel
      } = this;
      return (
        <div>
          <div class={`${prefixCls}-inner-content`}>
            <div class={`${prefixCls}-message`}>
              <Icon type="info_circle" />
              <div class={`${prefixCls}-message-title`}>{getTitle()}</div>
            </div>
            <div class={`${prefixCls}-buttons`}>
              <Button on-click={onCancel} size="small">
                {cancelText}
              </Button>
              <Button on-click={onConfirm} type={okType} size="small">
                {okText}
              </Button>
            </div>
          </div>
        </div>
      );
    },
    onVisibleChange(visible) {
      this.setInnerVisible(visible);
    },
  },
  render() {
    const {
      $slots, bindProps, renderOverlay, onVisibleChange
    } = this;
    const on = {
      'visible-change': onVisibleChange,
    };
    return (
      <Tooltip {...{ props: bindProps, on }}>
        {$slots.default}
        <template slot="content">{renderOverlay()}</template>
      </Tooltip>
    );
  },
};
