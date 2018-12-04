<template>
  <v-pagination v-bind="bindProps"
                :class-name="`${prefixCls}-${theme}`"
                v-on="$listeners" />
</template>

<script>
  import omit from 'object.omit';
  import VPagination from '@suning/v-pagination';
  import { buildComponentName } from '../utils';
  import Icon from '../icon';

  export default {
    name: buildComponentName('Pagination'),
    components: {
      VPagination,
    },
    props: {
      prefixCls: {
        type: String,
        default: 'ux-pagination',
      },
      total: Number,
      current: Number,
      pageSize: Number,
      size: String,
      simple: Boolean,
      showQuickJumper: Boolean,
      showQuickJumperConfirmBtn: {
        type: Boolean,
        default: true,
      },
      showBeforeTotal: Function,
      showAfterTotal: Function,
      itemRender: Function,
      theme: {
        type: String,
        default: 'light',
      },
      mode: {
        type: String,
        default: 'normal',
        validator(val) {
          return ['normal', 'stream'].indexOf(val) > -1;
        },
      },
      pageBufferSize: {
        type: Number,
        default: undefined,
      },
    },
    computed: {
      bindProps() {
        const {
          renderPrevIcon, renderNextIcon, renderJumpPrevIcon, renderJumpNextIcon
        } = this;
        return {
          renderPrevIcon,
          renderNextIcon,
          renderJumpPrevIcon,
          renderJumpNextIcon,
          ...omit(this.$props, ['theme']),
        };
      },
    },
    methods: {
      renderPrevIcon() {
        const { prefixCls } = this;
        return (
          <a class={`${prefixCls}-item-link`}>
            <Icon type="left" />
          </a>
        );
      },
      renderNextIcon() {
        const { prefixCls } = this;
        return (
          <a class={`${prefixCls}-item-link`}>
            <Icon type="right" />
          </a>
        );
      },
      renderJumpPrevIcon() {
        const { prefixCls } = this;
        return (
          <a class={`${prefixCls}-item-link`}>
            <div class={`${prefixCls}-item-container`}>
              <Icon class={`${prefixCls}-item-link-icon`} type="double_left" />
              <span class={`${prefixCls}-item-ellipsis`}>•••</span>
            </div>
          </a>
        );
      },
      renderJumpNextIcon() {
        const { prefixCls } = this;
        return (
          <a class={`${prefixCls}-item-link`}>
            <div class={`${prefixCls}-item-container`}>
              <Icon class={`${prefixCls}-item-link-icon`} type="double_right" />
              <span class={`${prefixCls}-item-ellipsis`}>•••</span>
            </div>
          </a>
        );
      },
    },
  };
</script>
