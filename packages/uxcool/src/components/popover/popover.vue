<template>
  <v-tooltip v-bind="bindProps"
             :tooltip-class="[popoverClass, `${prefixCls}-${theme}`]"
             :tooltip-style="popoverStyle"
             v-on="$listeners">
    <slot />
    <template slot="content">
      <div v-if="title||$slots.title"
           :class="`${prefixCls}-title`">
        <slot name="title">{{ title }}</slot>
      </div>
      <div :class="`${prefixCls}-inner-content`">
        <slot name="content">{{ content }}</slot>
      </div>
    </template>
  </v-tooltip>
</template>

<script>
  import omit from 'object.omit';
  import { buildComponentName } from '../utils';
  import VTooltip from '../tooltip';

  export default {
    name: buildComponentName('Popover'),
    components: {
      VTooltip,
    },
    props: {
      prefixCls: {
        type: String,
        default: 'ux-popover',
      },
      visible: {
        type: Boolean,
        default: false,
      },
      placement: {
        type: String,
        default: 'top',
      },
      trigger: {
        type: [String, Array],
        default: 'hover',
      },
      popoverClass: {
        type: [String, Array, Object],
        default: undefined,
      },
      popoverStyle: {
        type: Object,
        default: undefined,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      transitionName: {
        type: String,
        default: 'zoom-big',
      },
      animation: {
        type: String,
        default: 'zoom-big',
      },
      mouseEnterDelay: {
        type: Number,
        default: 100,
      },
      mouseLeaveDelay: {
        type: Number,
        default: 100,
      },
      title: {
        type: String,
        default: '',
      },
      content: {
        type: String,
        default: '',
      },
      theme: {
        type: String,
        default: 'light',
      },
      arrowPointAtCenter: {
        type: Boolean,
        default: false,
      },
      autoAdjustOverflow: {
        type: Boolean,
        default: true,
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
      bindProps() {
        return omit(this.$props, ['theme', 'title', 'content', 'popoverClass', 'popoverStyle']);
      },
    },
  };
</script>
