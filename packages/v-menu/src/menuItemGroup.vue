<template>
  <li :class="classes"
      :title="getAttrTitleVal($slots.title, title)">
    <div :class="titleClasses"
         :style="paddingStyle">
      <slot name="title">{{ title }}</slot>
    </div>
    <ul :class="listClasses">
      <slot />
    </ul>
  </li>

</template>

<script>
  import commonMixin from './mixins/common';
  import { getTitle } from './utils';

  export default {
    name: 'MenuItemGroup',
    mixins: [commonMixin],
    props: {
      title: {
        type: String,
        default: '',
      },
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
    created() {
      this.rootMenu.addDescendants(this);
    },
    beforeDestroy() {
      this.rootMenu.removeDescendants(this);
    },
    methods: {
      getAttrTitleVal(slotTitle, title) {
        const { hasTitleAttr } = this;
        return hasTitleAttr ? getTitle(slotTitle, title) : '';
      },
    },
  };
</script>
