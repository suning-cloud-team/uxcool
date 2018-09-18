<template>
  <div :class="clazz">
    <div v-if="showHeader"
         :class="[prefixCls + '-header']"
         :style="headerStyle">
      <h3 v-if="showTitle"
          :class="[prefixCls + '-title']">
        <slot name="icon">
          <icon v-if="showIcon"
                :type="icon"
                :class="prefixCls + '-icon'" />
        </slot>
        <slot name="title">{{ title }} </slot>
      </h3>
      <div v-if="showActions"
           :class="[prefixCls + '-actions']">
        <slot name="actions" />
      </div>
    </div>
    <div :class="bodyClazz"
         :style="bodyStyle">
      <slot />
    </div>
  </div>
</template>

<script>
  import { buildComponentName } from '../utils';
  import Icon from '../icon';

  const colorReg = /^(pink|red|yellow|orange|cyan|green|blue|purple|geekblue|magenta|volcano|gold|lime)$/;

  export default {
    name: buildComponentName('Box'),
    components: {
      Icon,
    },
    props: {
      prefixCls: {
        type: String,
        default: 'ux-box',
      },
      bordered: {
        type: Boolean,
        default: false,
      },
      flex: {
        type: Boolean,
        default: false,
      },
      color: {
        type: String,
        default: '',
      },
      icon: {
        type: String,
        default: '',
      },
      title: {
        type: String,
        default: '',
      },
      bodyClass: {
        type: String,
        default: '',
      },
      bodyStyle: {
        type: Object,
        default() {
          return {};
        },
      },
    },
    data() {
      return {
        showHeader: false,
        showIcon: false,
        showTitle: false,
        showActions: false,
      };
    },
    computed: {
      clazz() {
        const { prefixCls, flex, bordered, color } = this;

        return {
          [prefixCls]: true,
          [`${prefixCls}-flex`]: flex,
          [`${prefixCls}-bordered`]: bordered,
          [`${prefixCls}-solid`]: color,
          [`${prefixCls}-${color}`]: colorReg.test(color),
        };
      },
      headerStyle() {
        const styleObject = {};
        const { color } = this;

        if (!colorReg.test(color)) {
          styleObject.background = color;
        }

        return styleObject;
      },
      bodyClazz() {
        const { bodyClass, prefixCls } = this;

        return [`${prefixCls}-body`, bodyClass];
      },
    },
    mounted() {
      const { icon, title, actions } = this.$slots;

      this.showIcon = icon !== undefined || this.icon;
      this.showTitle = title !== undefined || this.title;
      this.showActions = actions !== undefined;
      this.showHeader = this.showIcon || this.showActions || this.showTitle;
    },
  };
</script>

