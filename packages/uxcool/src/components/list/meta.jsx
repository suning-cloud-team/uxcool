import { buildComponentName } from '../utils';
import Mixin from './mixin';

export default {
  name: buildComponentName('ListItemMeta'),
  isListItemMeta: true,
  mixins: [Mixin],
  inheritAttrs: false,
  props: {
    title: {
      type: String,
      default: '',
    },
    desc: {
      type: String,
      default: '',
    },
  },
  computed: {
    prefixCls() {
      return `${this.rootPrefixCls}-item-meta`;
    },
    classes() {
      const { prefixCls } = this;
      return {
        [prefixCls]: true,
      };
    },
  },
  methods: {
    renderChildren() {
      const {
        $slots: { avatar: slotAvatar, title: slotTitle, desc: slotDesc },
        prefixCls,
        title,
        desc,
      } = this;
      const titleContent = slotTitle || title;
      const descContent = slotDesc || desc;

      const avatarElement = slotAvatar ? (
        <div class={`${prefixCls}-avatar`}>{slotAvatar}</div>
      ) : null;

      const content = titleContent || descContent ? (
          <div class={`${prefixCls}-content`}>
            {titleContent ? <h4 class={`${prefixCls}-title`}>{titleContent}</h4> : null}
            {descContent ? <div class={`${prefixCls}-description`}>{descContent}</div> : null}
          </div>
      ) : null;

      return [avatarElement, content];
    },
  },
  render() {
    const { $attrs, classes, renderChildren } = this;
    return <div {...{ class: classes, attrs: $attrs }}>{renderChildren()}</div>;
  },
};
