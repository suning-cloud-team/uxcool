<template>
  <li slot-scope="props"
      :class="classes"
      :style="[paddingStyle]"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
      @click="onClick($event)">
    <slot />
  </li>
</template>

<script>
  import commonMixin from './mixins/common';

  export default {
    name: 'MenuItem',
    mixins: [commonMixin],
    props: {
      name: {
        type: [String, Number],
        required: true,
      },
      label: {
        type: String,
        default: '',
      },
      disabled: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      prefixCls() {
        return `${this.rootPrefixCls}-item`;
      },
      isSelected() {
        const { selectedItems } = this;
        return selectedItems.indexOf(this) > -1;
      },
      classes() {
        const {
          prefixCls, disabled, isSelected, activeItem
        } = this;
        return {
          [prefixCls]: true,
          // TODO:
          [`${prefixCls}-selected`]: isSelected,
          [`${prefixCls}-active`]: !disabled && activeItem === this,
          [`${prefixCls}-disabled`]: disabled,
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
      onMenuActive(e) {
        this.rootMenu.onMenuActive(e);
      },
      onMenuItemClick(e) {
        this.rootMenu.onMenuItemClick(e);
      },
      onMenuItemDeselect(e) {
        this.rootMenu.onMenuItemDeselect(e);
      },
      onMenuItemSelect(e) {
        this.rootMenu.onMenuItemSelect(e);
      },
      onMouseEnter() {
        this.onMenuActive({
          item: this,
          hover: true,
        });
      },
      onMouseLeave() {
        this.onMenuActive({
          item: this,
          hover: false,
        });
      },
      onClick(e) {
        const {
          isSelected,
          disabled,
          isMultiple,
          onMenuItemClick,
          onMenuItemDeselect,
          onMenuItemSelect,
        } = this;
        if (disabled) {
          return;
        }
        const event = {
          item: this,
          name: this.eventName,
          eventPath: [this.eventName],
          domEvent: e,
        };
        onMenuItemClick(event);
        if (isSelected) {
          if (isMultiple) {
            onMenuItemDeselect(event);
          }
        } else {
          onMenuItemSelect(event);
        }
      },
    },
  };
</script>
