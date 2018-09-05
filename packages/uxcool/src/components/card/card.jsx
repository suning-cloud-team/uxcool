import { isArray, isSameTypeVNode } from '@suning/v-utils';
import { buildComponentName } from '../utils';

export default {
  name: buildComponentName('CardAdvance'),
  props: {
    prefixCls: {
      type: String,
      default: 'ux-card-advance',
    },
    title: {
      type: String,
      default: '',
    },
    extra: {
      type: String,
      default: '',
    },
    bordered: {
      type: Boolean,
      default: true,
    },
    headStyle: {
      type: Object,
      default: null,
    },
    bodyStyle: {
      type: Object,
      default: null,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    hoverable: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: '',
      validator(val) {
        return ['', 'inner'].indexOf(val) > -1;
      },
    },
    cover: {
      type: String,
      default: '',
    },
  },
  computed: {
    classes() {
      const {
        prefixCls, loading, bordered, hoverable, type
      } = this;

      return {
        [`${prefixCls}-loading`]: loading,
        [`${prefixCls}-bordered`]: bordered,
        [`${prefixCls}-hoverable`]: hoverable,
        [`${prefixCls}-type-${type}`]: !!type,
      };
    },
  },
  methods: {
    hasGrid() {
      const { $slots: { default: slotDefault } } = this;

      let ret = false;
      if (slotDefault) {
        for (let i = 0, l = slotDefault.length; i < l; i += 1) {
          if (isSameTypeVNode(slotDefault[i], 'isCardGroupType')) {
            ret = true;
            break;
          }
        }
      }
      return ret;
    },
    renderHeader() {
      const {
        $slots: { title: slotTitle, extra: slotExtra },
        prefixCls,
        title,
        extra,
        headStyle,
      } = this;
      const titleContent = slotTitle || title;
      const extraContent = slotExtra || extra;
      let headerNode = null;
      if (titleContent || extraContent) {
        headerNode = (
          <div class={`${prefixCls}-head`} style={headStyle}>
            <div class={`${prefixCls}-head-wrapper`}>
              {titleContent ? <div class={`${prefixCls}-head-title`}>{titleContent}</div> : null}
              {extraContent ? <div class={`${prefixCls}-extra`}>{extraContent}</div> : null}
            </div>
          </div>
        );
      }
      return headerNode;
    },
    renderCover() {
      const { $slots: { cover: slotCover }, prefixCls, cover } = this;
      const coverContent = slotCover || cover;
      return coverContent ? <div class={`${prefixCls}-cover`}>{coverContent}</div> : null;
    },
    renderBody() {
      const { $slots: { default: slotDefault }, prefixCls, bodyStyle } = this;
      return (
        <div class={`${prefixCls}-body`} style={bodyStyle}>
          {slotDefault}
        </div>
      );
    },
    renderActions() {
      const { $slots: { actions: slotActions }, prefixCls } = this;
      let actionNode = null;
      if (isArray(slotActions) && slotActions.length > 0) {
        const actionW = `${100 / slotActions.length}%`;
        actionNode = (
          <ul class={`${prefixCls}-actions`}>
            {slotActions.map((action, i) => (
              <li key={`action-${i}`} style={`width: ${actionW}`}>
                <span>{action}</span>
              </li>
            ))}
          </ul>
        );
      }
      return actionNode;
    },
  },
  render() {
    const {
      prefixCls,
      classes,
      renderHeader,
      renderCover,
      renderBody,
      renderActions,
      hasGrid,
    } = this;

    return (
      <div class={[classes, { [`${prefixCls}-contain-grid`]: hasGrid() }]}>
        {renderHeader()}
        {renderCover()}
        {renderBody()}
        {renderActions()}
      </div>
    );
  },
};
