import { buildComponentName } from '../utils';

export default {
  name: buildComponentName('CardMeta'),
  props: {
    prefixCls: {
      type: String,
      default: 'ux-card-advance',
    },
    title: {
      type: String,
      default: '',
    },
    desc: {
      type: String,
      default: '',
    },
  },
  render() {
    const {
      $slots: { avatar: slotAvatar, title: slotTitle, desc: slotDesc },
      prefixCls,
      title,
      desc,
    } = this;
    const titleContent = slotTitle || title;
    const descContent = slotDesc || desc;
    let detailNode = null;
    if (titleContent || descContent) {
      detailNode = (
        <div class={`${prefixCls}-meta-detail`}>
          {titleContent ? <div class={`${prefixCls}-meta-title`}>{titleContent}</div> : null}
          {descContent ? <div class={`${prefixCls}-meta-description`}>{descContent}</div> : null}
        </div>
      );
    }
    return (
      <div class={`${prefixCls}-meta`}>
        {slotAvatar ? <div class={`${prefixCls}-meta-avatar`}>{slotAvatar}</div> : null}
        {detailNode}
      </div>
    );
  },
};
