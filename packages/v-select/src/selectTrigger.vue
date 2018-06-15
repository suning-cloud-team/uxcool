<template>
  <div role="selectTrigger"
       ref="selectTrigger">
    <trigger ref="triggerRef"
             :visible="visible"
             :actions="actions"
             :popup-align="align"
             :prefix-cls="dropDownPrefixCls"
             :popup-class="popupClasses"
             :popup-style="popupStyles"
             :get-popup-container="getContainer"
             destroy-popup-on-hide
             @on-popup-visible-change="onPopupVisible">
      <template slot="trigger">
        <slot />
      </template>
      <dropdown-menu slot="popup"
                     @on-blur="onBlur"
                     @on-focus="onFocus"
                     :prefix-cls="dropDownPrefixCls"
                     :root-uid="rootUUID"
                     :descendants="filterDescs"
                     :value="value"
                     :multiple="multiple"
                     :style="dropdownMenuStyle"
                     :show-search="showSearch"
                     :theme="theme"
                     @menu-select="onMenuSelect"
                     @menu-deselect="onMenuDeselect" />
    </trigger>
  </div>
</template>

<script>
  import { isFunction } from '@suning/v-utils';
  import Trigger from '@suning/v-trigger';
  import DropdownMenu from './dropdownMenu.vue';
  import { CMP_TYPE_ENUM } from './constants';
  import { defaultFilterOptiontFn } from './utils';

  export default {
    name: 'SelectTrigger',
    inject: ['selectRoot'],
    components: {
      Trigger,
      DropdownMenu,
    },
    props: {
      prefixCls: String,
      descendants: Array,
      inputValue: String,
      value: Array,
      align: Object,
      actions: Array,
      visible: Boolean,
      multiple: Boolean,
      dropdownMatchSelectWidth: Boolean,
      dropdownMenuStyle: [Array, Object],
      showSearch: Boolean,
      theme: String,
      filterOption: Function,
    },
    data() {
      return {
        popupWidth: -1,
      };
    },
    computed: {
      rootUUID() {
        return this.selectRoot.UUID;
      },
      getContainer() {
        return this.selectRoot.getContainer;
      },
      dropDownPrefixCls() {
        const { prefixCls } = this;
        return `${prefixCls}-dropdown`;
      },
      popupClasses() {
        const { multiple, dropDownPrefixCls, theme } = this;
        return {
          [`${dropDownPrefixCls}-${theme}`]: true,
          [`${dropDownPrefixCls}--${multiple ? 'multiple' : 'single'}`]: true,
        };
      },
      popupStyles() {
        const { popupWidth, dropdownMatchSelectWidth } = this;
        const style = {};
        style[dropdownMatchSelectWidth ? 'width' : 'minWidth'] = `${popupWidth}px`;
        return style;
      },
      filterDescs() {
        const {
          filterDescendants, showSearch, descendants, createNoDataArr
        } = this;
        if (descendants.length === 0) {
          return createNoDataArr('No Data');
        }

        let descs = descendants;

        if (showSearch) {
          descs = filterDescendants();
          if (descs.filter(v => v.type === CMP_TYPE_ENUM.OPTION).length === 0) {
            descs = createNoDataArr('Not Found');
          }
        }
        return descs;
      },
    },
    mounted() {
      this.setPopupWidth();
    },
    methods: {
      onBlur() {
        this.$emit('blur');
        // console.log('blur');
      },
      onFocus() {
        this.$emit('focus');
        // console.log('focus');
      },
      onMenuSelect(e) {
        this.$emit('menu-select', e);
      },
      onMenuDeselect(e) {
        this.$emit('menu-deselect', e);
      },
      onPopupVisible(e) {
        this.$emit('popup-visible-change', e);
      },
      setPopupWidth() {
        const width = this.$refs.selectTrigger.offsetWidth;
        if (width !== this.popupWidth) {
          this.popupWidth = width;
        }
      },
      filterDescendants() {
        const { descendants, inputValue, filterOption } = this;
        const filterFn = isFunction(filterOption) ? filterOption : defaultFilterOptiontFn;
        if (!inputValue) {
          return descendants;
        }

        return descendants.filter((v) => {
          const { vm } = v;
          const option = {
            disabled: vm.disabled,
            value: vm.value,
            label: vm.label,
          };
          return v.type === CMP_TYPE_ENUM.OPTION ? filterFn(inputValue, option, 'value') : true;
        });
      },
      createNoDataArr(label) {
        return [
          {
            type: CMP_TYPE_ENUM.OPTION,
            parent: this.selectRoot,
            vm: {
              label,
              value: label,
              $slots: {},
              disabled: true,
            },
          },
        ];
      },
    },
  };
</script>
