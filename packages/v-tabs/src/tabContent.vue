<template>
  <div :class="classes"
       :style="animateStyle">
    <slot></slot>
  </div>
</template>


<script>
  import { isTransform3dSupported, isVertical } from './utils';

  export default {
    name: 'TabContent',
    props: {
      prefixCls: String,
      tabBarPosition: String,
      animated: Boolean,
      activeIdx: Number,
    },
    data() {
      return {
        isSupportedTransform3d: isTransform3dSupported(),
      };
    },
    computed: {
      classes() {
        const { prefixCls, animated } = this;
        return {
          [`${prefixCls}-content`]: true,
          [`${prefixCls}-content-animated`]: animated,
          [`${prefixCls}-content-no-animated`]: !animated,
        };
      },
      animateStyle() {
        const {
          activeIdx, isSupportedTransform3d, animated, tabBarPosition
        } = this;
        let style = {};
        if (animated) {
          if (activeIdx !== -1) {
            if (isSupportedTransform3d) {
              if (isVertical(tabBarPosition)) {
                style = {
                  transform: `translate3d(0, ${-activeIdx * 100}%, 0)`,
                };
              } else {
                style = {
                  transform: `translate3d(${-activeIdx * 100}%, 0, 0)`,
                };
              }
            } else {
              style = {
                [isVertical(tabBarPosition) ? 'margin-top' : 'margin-left']: `${-activeIdx * 100}%`,
              };
            }
          } else {
            style = {
              display: 'none',
            };
          }
        }

        return style;
      },
    },
  };
</script>