<template>
  <div ref="step"
       :class="classes"
       :style="itemStyle">
    <div :class="`${prefixCls}-tail`" />
    <div :class="`${prefixCls}-icon`">
      <span :class="iconClasses($slots.icon)">
        <slot name="icon"
              :class="`${rootPrefixCls}-icon-dot`">
          <span v-if="progressDot"
                :class="`${rootPrefixCls}-icon-dot`" />
          <span v-else-if="(!icon && status!=='finish' && status!=='error')">
            {{ seq + 1 }}
          </span>
        </slot>
      </span>
    </div>
    <div :class="`${prefixCls}-content`">
      <div :class="`${prefixCls}-title`">
        <slot name="title">{{ title }}</slot>
      </div>
      <div :class="`${prefixCls}-description`">
        <slot name="desc">{{ desc }}</slot>
      </div>
    </div>
  </div>
</template>

<script>
  import { getStyleComputedProperty } from './utils';

  export default {
    name: 'Step',
    inject: ['stepRoot'],
    props: {
      icon: {
        type: String,
        default: '',
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
    data() {
      return {
        seq: -2,
        stepSize: 0,
        isLast: false,
      };
    },
    computed: {
      rootPrefixCls() {
        return this.stepRoot.prefixCls;
      },
      prefixCls() {
        return `${this.rootPrefixCls}-item`;
      },
      iconPrefix() {
        return this.stepRoot.iconPrefix;
      },
      rootStatus() {
        return this.stepRoot.status;
      },
      isSupportFlex() {
        return this.stepRoot.isSupportFlex;
      },
      direction() {
        return this.stepRoot.direction;
      },
      progressDot() {
        return this.stepRoot.progressDot;
      },
      current() {
        return this.stepRoot.normalizeCurrent;
      },
      status() {
        const { seq, current, rootStatus } = this;
        let s = 'wait';
        if (seq === current) {
          s = rootStatus;
        } else if (seq < current) {
          s = 'finish';
        }
        return s;
      },
      lastDescendantOffsetW() {
        return this.stepRoot.lastDescendantOffsetW;
      },
      hasNextError() {
        const { rootStatus, seq, current } = this;
        return rootStatus === 'error' && current && seq === current - 1;
      },
      classes() {
        const {
          rootPrefixCls, prefixCls, status, icon, $slots, hasNextError
        } = this;
        return {
          [prefixCls]: true,
          [`${prefixCls}-${status}`]: true,
          [`${prefixCls}-custom`]: icon || $slots.icon,
          [`${rootPrefixCls}-next-error`]: hasNextError,
        };
      },
      itemStyle() {
        const {
          isSupportFlex, seq, direction, stepSize, lastDescendantOffsetW, $el
        } = this;
        const lastStepIdx = stepSize - 1;
        // IE9不支持flex, 兼容IE9,
        if (!isSupportFlex && direction !== 'vertical' && seq !== lastStepIdx) {
          let offset = Math.round(lastDescendantOffsetW / lastStepIdx) + 1;
          const mr = parseInt(getStyleComputedProperty($el, 'margin-right'), 10);
          if (mr) {
            offset += mr;
          }
          return {
            width: `calc(${100 / lastStepIdx}% - ${offset}px)`,
          };
        }
        return {};
      },
    },
    created() {
      this.addToRoot();
    },
    updated() {
      if (this.isLast) {
        const w = this.$el.offsetWidth;
        if (w !== this.lastDescendantOffsetW) {
          this.updateRootLastDescendantOffsetW(w);
        }
      }
    },
    beforeDestroy() {
      this.removeFromRoot();
    },
    methods: {
      iconClasses(slotIcon) {
        const {
          rootPrefixCls, iconPrefix, icon, status, progressDot
        } = this;
        const isIconFinishError = icon || status === 'finish' || status === 'error';
        const isIconPrefix = !progressDot && !slotIcon && isIconFinishError;
        return {
          [`${rootPrefixCls}-icon`]: true,
          [iconPrefix]: isIconPrefix,
          [`${iconPrefix}-${icon}`]: !progressDot && !slotIcon && icon,
          [`${iconPrefix}-ok`]: !progressDot && !slotIcon && !icon && status === 'finish',
          [`${iconPrefix}-close`]: !progressDot && !slotIcon && !icon && status === 'error',
        };
      },
      addToRoot() {
        this.stepRoot.addDescendant(this);
      },
      removeFromRoot() {
        this.stepRoot.removeDescendant(this);
      },
      updateRootLastDescendantOffsetW(width) {
        this.stepRoot.updateLastDescendantOffsetW(width);
      },
    },
  };
</script>
