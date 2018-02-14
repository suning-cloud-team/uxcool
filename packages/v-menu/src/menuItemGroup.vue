<template>
  <li :class="classes">
    <div :class="titleClasses"
         :style="paddingStyle">{{title}}</div>
    <ul :class="listClasses">
      <slot></slot>
    </ul>
  </li>

</template>

<script>
  import commonMixin from './mixins/common';

  export default {
    name: 'MenuItemGroup',
    mixins: [commonMixin],
    props: {
      title: {
        type: String,
        default: '',
        required: true,
      },
    },
    created() {
      this.rootMenu.addDescendants(this);
    },
    beforeDestroy() {
      this.rootMenu.removeDescendants(this);
    },
    computed: {
      paddingStyle() {
        const { level, isInlineMode, inlineIndent } = this;
        if (!isInlineMode) {
          return {};
        }
        return {
          paddingLeft: level * inlineIndent - inlineIndent / 2,
        };
      },
      classes() {
        const { rootPrefixCls } = this;
        return {
          [`${rootPrefixCls}-item-group`]: true,
        };
      },
      titleClasses() {
        const { rootPrefixCls } = this;
        return {
          [`${rootPrefixCls}-item-group-title`]: true,
        };
      },
      listClasses() {
        const { rootPrefixCls } = this;
        return {
          [`${rootPrefixCls}-item-group-list`]: true,
        };
      },
    },
  };
</script>
