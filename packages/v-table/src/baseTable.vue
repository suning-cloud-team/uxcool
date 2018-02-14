<template>
  <table :class="classes"
         :style="style">
    <col-group :fixed="fixed" />
    <table-header v-if="hasHead"
                  :fixed="fixed" />
    <table-body v-if="hasBody"
                :fixed="fixed" />
  </table>
</template>

<script>
  import { isPxOrPercentage } from './utils';
  import SubMixin from './mixins/sub';
  import ColGroup from './colGroup.vue';
  import TableHeader from './tableHeader';
  import TableBody from './tableBody';

  export default {
    name: 'BasicTable',
    components: {
      ColGroup,
      TableHeader,
      TableBody,
    },
    mixins: [SubMixin],
    props: {
      hasHead: {
        type: Boolean,
        default: false,
      },
      hasBody: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      classes() {
        const { prefixCls, fixed, scroll } = this;
        return {
          [`${prefixCls}-fixed`]: fixed || scroll.x,
        };
      },
      style() {
        const { fixed, scroll } = this;
        const style = {};
        if (!fixed && scroll.x) {
          style.tableLayout = 'fixed';
          if (typeof scroll.x === 'boolean') {
            style.width = '100%';
          } else {
            style.width = isPxOrPercentage(scroll.x) ? scroll.x : `${scroll.x}px`;
          }
        }
        return style;
      },
    },
  };
</script>
