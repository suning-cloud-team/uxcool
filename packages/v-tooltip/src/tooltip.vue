<template>
  <trigger ref="tooltipTriggerRef"
           :visible="isOpen"
           :prefix-cls="prefixCls"
           :destroy-popup-on-hide="destroyTooltipOnHide"
           :builtin-placements="builtinPlacements"
           :popup-placement="placement"
           :popup-align="align"
           :actions="actions"
           :mouse-enter-delay="mouseEnterDelay"
           :mouse-leave-delay="mouseLeaveDelay"
           :popup-transition-name="transitionName"
           :popup-animation="animation"
           :popup-class="tooltipClass"
           :popup-style="tooltipStyle"
           :get-popup-container="getPopupContainer"
           @on-popup-visible-change="onPopupVisible"
  >
    <template slot="trigger">
      <slot />
    </template>
    <template slot="popup">
      <div :class="`${prefixCls}-arrow`" />
      <div :class="`${prefixCls}-inner`">
        <slot name="content">
          {{ content }}
        </slot>
      </div>
    </template>
  </trigger>
</template>


<script>
  import Trigger from '@cloud-sn/v-trigger';
  import placements from './placements';

  export default {
    name: 'Tooltip',
    components: {
      Trigger,
    },
    props: {
      prefixCls: {
        type: String,
        default: 'v-tooltip',
      },
      visible: {
        type: Boolean,
        default: false,
      },
      content: {
        type: String,
        default: '',
      },
      disabled: {
        type: Boolean,
        default: false,
      },
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
          return vals.every((v) => ['none', 'click', 'hover', 'focus'].indexOf(v) > -1);
        },
      },
      destroyTooltipOnHide: {
        type: Boolean,
        default: false,
      },
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
      // ms
      mouseLeaveDelay: {
        type: Number,
        default: 100,
      },
      transitionName: {
        type: String,
        default: '',
      },
      animation: {
        type: String,
        default: '',
      },
      tooltipClass: {
        type: [String, Array, Object],
        default: '',
      },
      tooltipStyle: {
        type: Object,
        default: null,
      },
      getPopupContainer: {
        type: Function,
        default: null,
      },
    },
    data() {
      return {
        open: false,
      };
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
    watch: {
      visible(nVal, oVal) {
        if (nVal !== oVal) {
          this.setOpen(nVal);
        }
      },
    },
    created() {
      this.setOpen(this.visible);
    },
    methods: {
      setOpen(visible) {
        this.open = visible;
      },
      onPopupVisible(visible) {
        this.setOpen(visible);
        this.$emit('visible-change', visible);
      },
      updateTooltipAlign() {
        const {
          $refs: { tooltipTriggerRef },
        } = this;

        if (tooltipTriggerRef) {
          tooltipTriggerRef.forcePopupAlign();
        }
      },
    },
  };
</script>
