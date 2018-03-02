<template>
  <v-pagination v-bind="bindProps"
                :class-name="`${prefixCls}-${theme}`"
                v-on="$listeners" />
</template>

<script>
  import omit from 'object.omit';
  import VPagination from '@suning/v-pagination';
  import { buildComponentName } from '../utils';

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
    },
    computed: {
      bindProps() {
        return omit(this.$props, ['theme']);
      },
    },
  };
</script>
