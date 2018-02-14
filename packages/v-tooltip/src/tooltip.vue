<template>
  <trigger :visible="isOpen"
           :prefix-cls="prefixCls"
           :destroy-popup-on-hide="destroyTooltipOnHide"
           :builtin-placements="builtinPlacements"
           :popup-placement="placement"
           :popup-align="align"
           :actions="actions"
           :mouse-enter-delay="mouseEnterDelay"
           :mouse-leave-delay="mouseLeaveDelay"
           :popup-transition-name="transitionName"
           :popup-class="tooltipClass"
           :popup-style="tooltipStyle"
           @on-popup-visible-change="onPopupVisible">
    <template slot="trigger">
      <slot></slot>
    </template>
    <template slot="popup">
      <div :class="`${prefixCls}-arrow`"></div>
      <div :class="`${prefixCls}-inner`">
        <slot name="content">
          {{content}}
        </slot>
      </div>
    </template>
  </trigger>
</template>


<script>
  import Trigger from '@suning/v-trigger';
  import placements from './placements';

  export default {
    name: 'Tooltip',
    props: {
      prefixCls: {
        type: String,
        default: 'v-tooltip',
      },
      visible: Boolean,
      content: String,
      disabled: Boolean,
      placement: {
        type: String,
        default: 'left',
      },
      trigger: {
        type: [String, Array],
        default() {
          return ['hover'];
        },
        validator(val) {
          let vals = val;
          if (!Array.isArray(val)) {
            vals = [vals];
          }
          if (vals.length === 0) {
            return false;
          }
          return vals.every(v => ['click', 'hover', 'focus'].indexOf(v) > -1);
        },
      },
      destroyTooltipOnHide: Boolean,
      builtinPlacements: {
        type: Object,
        default() {
          return placements;
        },
      },
      align: {
        type: Object,
        default() {
          return {};
        },
      },
      // ms
      mouseEnterDelay: {
        type: Number,
        default: 0,
      },
      mouseLeaveDelay: {
        type: Number,
        default: 0.1,
      },
      transitionName: String,
      tooltipClass: [String, Array, Object],
      tooltipStyle: Object,
    },
    data() {
      return {
        open: false,
      };
    },
    created() {
      this.setOpen(this.visible);
    },
    computed: {
      isOpen() {
        const { disabled, open } = this;
        return !disabled && open;
      },
      actions() {
        const { trigger, disabled } = this;
        if (disabled) {
          return [];
        }
        let actions = trigger;
        if (!Array.isArray(trigger)) {
          actions = [trigger];
        }
        return actions;
      },
    },
    methods: {
      setOpen(visible) {
        this.open = visible;
      },
      onPopupVisible(visible) {
        this.setOpen(visible);
        this.$emit('visible-change', visible);
      },
    },
    components: {
      Trigger,
    },
    watch: {
      visible(nVal, oVal) {
        if (nVal !== oVal) {
          this.setOpen(nVal);
        }
      },
    },
  };
</script>
