<template>
  <spin-element v-if="!$slots.default"
                :class="[spinClasses, spinClass]"
                :style="spinStyle">
    <template slot="indicator">
      <slot name="indicator">
        <svg :class="`${prefixCls}-circle`"
             viewBox="25 25 50 50">
          <circle cx="50"
                  cy="50"
                  r="20"
                  fill="none" />
        </svg>
      </slot>
    </template>
    <template slot="tip">
      <div :class="`${prefixCls}-text`"
           v-if="tip||$slots.tip">
        <slot name="tip">
          {{tip}}
        </slot>
      </div>
    </template>
  </spin-element>
  <!-- wrap -->
  <div v-else
       :class="[`${prefixCls}-nested-loading`, wrapClass]"
       :style="wrapStyle">
    <spin-element v-show="isSpinning"
                  :class="[spinClasses, spinClass]"
                  :style="[spinStyle]">
      <template slot="indicator">
        <slot name="indicator">
          <svg :class="`${prefixCls}-circle`"
               viewBox="25 25 50 50">
            <circle cx="50"
                    cy="50"
                    r="20"
                    fill="none" />
          </svg>
        </slot>
      </template>
      <template slot="tip">
        <div :class="`${prefixCls}-text`"
             v-if="tip||$slots.tip">
          <slot name="tip">
            {{tip}}
          </slot>
        </div>
      </template>
    </spin-element>

    <div :class="containClasses">
      <slot></slot>
    </div>
  </div>
</template>
<script>
  import { buildComponentName } from '../utils';
  import SpinElement from './spinElement.vue';

  export default {
    name: buildComponentName('Spin'),
    props: {
      prefixCls: {
        type: String,
        default: 'ux-spin',
      },
      size: String,
      spinning: { type: Boolean, default: true },
      spinClass: [String, Object],
      spinStyle: [String, Object],
      wrapClass: [String, Object],
      wrapStyle: [String, Object],
      tip: String,
    },
    computed: {
      isSpinning() {
        return this.spinning;
      },
      spinClasses() {
        const {
          prefixCls, tip, size, isSpinning
        } = this;
        return {
          [prefixCls]: true,
          [`${prefixCls}-sm`]: size === 'small',
          [`${prefixCls}-lg`]: size === 'large',
          [`${prefixCls}-spinning`]: isSpinning,
          [`${prefixCls}-show-text`]: !!tip,
        };
      },
      containClasses() {
        const { prefixCls, isSpinning } = this;
        return {
          [`${prefixCls}-container`]: true,
          [`${prefixCls}-blur`]: isSpinning,
        };
      },
    },
    components: {
      SpinElement,
    },
  };
</script>
