<template>
  <v-tooltip v-bind="bindProps"
             :tooltip-class="[popoverClass, `${prefixCls}-${theme}`]"
             :tooltip-style="popoverStyle"
             v-on="$listeners">
    <slot></slot>
    <template slot="content">
      <div v-if="title||$slots.title"
           :class="`${prefixCls}-title`">
        <slot name="title">{{title}}</slot>
      </div>
      <div :class="`${prefixCls}-inner-content`">
        <slot name="content">{{content}}</slot>
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
    props: {
      prefixCls: {
        type: String,
        default: 'ux-popover',
      },
      visible: Boolean,
      placement: {
        type: String,
        default: 'top',
      },
      trigger: {
        type: [String, Array],
        default: 'hover',
      },
      popoverClass: [String, Array, Object],
      popoverStyle: Object,
      disabled: Boolean,
      transitionName: String,
      mouseEnterDelay: {
        type: Number,
        default: 100,
      },
      mouseLeaveDelay: {
        type: Number,
        default: 100,
      },
      title: String,
      content: String,
      theme: {
        type: String,
        default: 'light',
      },
      arrowPointAtCenter: Boolean,
      autoAdjustOverflow: {
        type: Boolean,
        default: true,
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
    components: {
      VTooltip,
    },
  };
</script>
