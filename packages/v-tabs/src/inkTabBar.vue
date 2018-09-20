<template>
  <div role="inkBar"
       :class="classes"
       :style="inkBarStyle"></div>
</template>

<script>
  import { HTMLElementType } from '@suning/v-utils';
  import { offset, isTransform3dSupported } from './utils';

  export default {
    name: 'InkTabBar',
    props: {
      prefixCls: String,
      inkBarAnimated: { type: Boolean, default: true },
      wrapNode: HTMLElementType(),
      activeTab: HTMLElementType(),
      tabBarPosition: String,
      size: String,
    },
    data() {
      return {
        isSupportedTransform3d: isTransform3dSupported(),
      };
    },
    computed: {
      classes() {
        const { prefixCls: rootPrefixCls, inkBarAnimated } = this;
        const prefixCls = `${rootPrefixCls}-ink-bar`;
        return {
          [prefixCls]: true,
          [`${prefixCls}-animated`]: inkBarAnimated,
          [`${prefixCls}-no-animated`]: !inkBarAnimated,
        };
      },
      inkBarStyle() {
        const {
          activeTab, wrapNode, tabBarPosition, isSupportedTransform3d, size
        } = this;
        let style = {};
        if (!wrapNode || !size) {
          return style;
        }

        const activeNode = activeTab;
        if (activeNode) {
          const wrapOffset = offset(wrapNode);
          const activeOffset = offset(activeNode);
          if (tabBarPosition === 'top' || tabBarPosition === 'bottom') {
            const left = activeOffset.left - wrapOffset.left;
            const width = activeNode.offsetWidth;
            if (isSupportedTransform3d) {
              style = {
                width: `${width}px`,
                transform: `translate3d(${left}px, 0 ,0)`,
              };
            } else {
              style = {
                left: `${left}px`,
                width: `${width}px`,
              };
            }
          } else {
            const top = activeOffset.top - wrapOffset.top;
            const height = activeNode.offsetHeight;
            if (isSupportedTransform3d) {
              style = {
                height: `${height}px`,
                transform: `translate3d(0, ${top}px, 0)`,
              };
            } else {
              style = {
                height: `${height}px`,
                top: `${top}px`,
              };
            }
          }
          style.display = 'block';
        } else {
          style.display = 'none';
        }
        return style;
      },
    },
  };
</script>
