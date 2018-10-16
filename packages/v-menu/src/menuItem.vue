<template>
  <li slot-scope="props"
      :class="classes"
      :style="[paddingStyle]"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
      @click="debounceOnClick">
    <slot />
  </li>
</template>

<script>
  import { debounce, getVNodeText } from '@suning/v-utils';
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
        const { selectedItemEventNames, eventName } = this;
        return selectedItemEventNames.indexOf(eventName) > -1;
      },
      classes() {
        const {
          prefixCls, disabled, isSelected, activeItemEventName, eventName
        } = this;
        return {
          [prefixCls]: true,
          // TODO:
          [`${prefixCls}-selected`]: isSelected,
          [`${prefixCls}-active`]: !disabled && activeItemEventName === eventName,
          [`${prefixCls}-disabled`]: disabled,
        };
      },
    },
    created() {
      this.debounceOnClick = debounce(this.onClick, 50);
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
      getVNodeText,
    },
  };
</script>
