import { isArray, isVNode } from '@suning/v-utils';
import { buildComponentName } from '../utils';
import Mixin from './mixin';

function isMetaVnode(vnode) {
  if (!isVNode(vnode)) {
    return false;
  }
  const { componentOptions: cp } = vnode;
  return !!(cp && cp.Ctor && cp.Ctor.options && cp.Ctor.options.isListItemMeta);
}

export default {
  name: buildComponentName('ListItem'),
  mixins: [Mixin],
  inheritAttrs: false,
  props: {
    actions: {
      type: Array,
      default() {
        return [];
      },
    },
    extra: {
      type: String,
      default: '',
    },
  },
  computed: {
    prefixCls() {
      return `${this.rootPrefixCls}-item`;
    },
  },
  methods: {
    getVNodes() {
      const { $slots: { default: slotDefault } } = this;
      let vnodes = {
        metas: [],
        others: [],
      };
      if (isArray(slotDefault)) {
        vnodes = slotDefault.reduce((r, vnode) => {
          if (isMetaVnode(vnode)) {
            r.metas.push(vnode);
          } else {
            r.others.push(vnode);
          }
          return r;
        }, vnodes);
      }
      return vnodes;
    },
    renderExtra(children) {
      const { $slots: { extra: slotExtra }, prefixCls, extra } = this;
      const nExtra = slotExtra || extra;
      if (!nExtra) {
        return children;
      }
      return (
        <div class={`${prefixCls}-extra-wrap`}>
          <div class={`${prefixCls}-main`}>{children}</div>
          <div class={`${prefixCls}-extra`}>{nExtra}</div>
        </div>
      );
    },
    renderActions() {
      const { $slots: { actions: slotActions }, prefixCls, actions } = this;

      const nActions = slotActions || actions;

      let actionsElement = null;
      if (isArray(nActions)) {
        const len = nActions.length;
        if (len > 0) {
          actionsElement = (
            <ul class={`${prefixCls}-action`}>
              {nActions.map((v, i) => (
                <li>
                  {v}
                  {i !== len - 1 ? <em class={`${prefixCls}-action-split`} /> : null}
                </li>
              ))}
            </ul>
          );
        }
      }
      return actionsElement;
    },
    renderChildren() {
      const {
        prefixCls, getVNodes, renderActions, renderExtra
      } = this;
      let children = null;
      const { metas, others } = getVNodes();

      const otherCls = {
        [`${prefixCls}-content`]: true,
        [`${prefixCls}-content-single`]: metas.length === 0,
      };
      const otherElement = others.length > 0 ? <div class={otherCls}>{others}</div> : null;
      children = [metas, otherElement, renderActions()];
      children = renderExtra(children);
      return children;
    },
  },
  render() {
    const { $attrs, prefixCls, renderChildren } = this;

    return <div {...{ class: [prefixCls], attrs: $attrs }}>{renderChildren()}</div>;
  },
};
