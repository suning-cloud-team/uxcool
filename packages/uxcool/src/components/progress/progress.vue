<template>
  <div :class="clazz">
    <div  :class="wrapperClass">
      <div :class="railClass">
        <div :class="barClass" :style="barStyle"></div>
      </div>
    </div>
    <div v-if="!hideInfo" :class="infoClass">
      <slot>{{percentage}}%</slot>
    </div>
  </div>
</template>

<script>
import { buildComponentName } from '../utils';

const prefixCls = 'ux-progress';

export default {
  name: buildComponentName('Progress'),
  props: {
    theme: {
      type: String,
      default: 'light',
    },
    status: {
      validator(value) {
        return ['default', 'success', 'error'].indexOf(value) > -1;
      },
      default: 'default',
    },
    hideInfo: Boolean,
    percentage: {
      type: [Number, String],
      default: 0,
    },
    strokeWidth: {
      type: [Number, String],
      default: 10,
    },
  },
  computed: {
    clazz() {
      return [
        `${prefixCls}`,
        `${prefixCls}-${this.theme}`,
        `${prefixCls}-${this.status}`,
        {
          [`${prefixCls}-show-info`]: !this.hideInfo,
        },
      ];
    },
    wrapperClass() {
      return `${prefixCls}-wrapper`;
    },
    railClass() {
      return `${prefixCls}-rail`;
    },
    barClass() {
      return `${prefixCls}-bar`;
    },
    infoClass() {
      return `${prefixCls}-info`;
    },
    barStyle() {
      return {
        width: `${this.percentage}%`,
        height: `${this.strokeWidth}px`,
      };
    },
  },
};
</script>
