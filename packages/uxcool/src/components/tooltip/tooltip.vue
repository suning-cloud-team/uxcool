<template>
  <v-tooltip ref="tooltipRef"
             v-bind="bindProps"
             :builtin-placements="buildinPlacements"
             v-on="$listeners">
    <slot/>
    <template slot="content">
      <slot name="content">
        {{content}}
      </slot>
    </template>
  </v-tooltip>
</template>


<script>
  import omit from 'object.omit';
  import VTooltip from '@suning/v-tooltip';
  import { buildComponentName } from '../utils';
  import getPlacements from './placements';

  export default {
    name: buildComponentName('Tooltip'),
    components: {
      VTooltip,
    },
    props: {
      prefixCls: {
        type: String,
        default: 'ux-tooltip',
      },
      visible: Boolean,
      placement: {
        type: String,
        default: 'top',
      },
      trigger: [String, Array],
      transitionName: String,
      tooltipClass: [String, Array, Object],
      tooltipStyle: Object,
      mouseEnterDelay: {
        type: Number,
        default: 100,
      },
      mouseLeaveDelay: {
        type: Number,
        default: 100,
      },
      content: String,
      disabled: Boolean,
      placements: Object,
      arrowPointAtCenter: Boolean,
      autoAdjustOverflow: {
        type: Boolean,
        default: true,
      },
    },
    data() {
      return {};
    },
    computed: {
      bindProps() {
        return omit(this.$props, [
          'content',
          'placements',
          'arrowPointAtCenter',
          'autoAdjustOverflow',
        ]);
      },
      buildinPlacements() {
        const { placements, arrowPointAtCenter, autoAdjustOverflow } = this;
        return (
          placements ||
          getPlacements({
            arrowPointAtCenter,
            verticalArrowShift: 8,
            autoAdjustOverflow,
          })
        );
      },
    },
    methods: {
      setOpen(visible) {
        const { $refs: { tooltipRef } } = this;
        if (tooltipRef) {
          tooltipRef.setOpen(visible);
        }
      },
      updateTooltipAlign() {
        const { $refs: { tooltipRef } } = this;
        if (tooltipRef) {
          tooltipRef.updateTooltipAlign();
        }
      },
    },
  };
</script>
