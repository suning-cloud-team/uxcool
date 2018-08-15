<template>
  <div role="select"
       :class="classes">
    <select-trigger ref="selectTriggerRef"
                    :prefix-cls="prefixCls"
                    :visible="open"
                    :actions="actions"
                    :align="align"
                    :dropdown-match-select-width="dropdownMatchSelectWidth"
                    :dropdown-menu-style="dropdownMenuStyle"
                    :descendants="descendants"
                    :input-value="inputValue"
                    :value="innerValues"
                    :multiple="isMultipleOrTags"
                    :show-search="isShowSearch"
                    :theme="theme"
                    :filter-option="filterOption"
                    @popup-visible-change="onPopupVisible"
                    @menu-select="onMenuSelect"
                    @menu-deselect="onMenuDeselect">
      <div ref="selectionRef"
           role="combobox"
           :class="selectionClasses">
        <!--control node-->
        <div role="value"
             :class="`${prefixCls}-selection__rendered`">
          <div :class="`${prefixCls}-selection__placeholder`"
               :style="[placeholderStyle,unSelectStyle]"
               unselectable="unselectable"
               @click="onPlaceholderClick">
            {{ placeholder }}
          </div>
          <!--single-->
          <template v-if="isSingleMode">
            <div :class="`${prefixCls}-selection-selected-value`"
                 :style="singleSelectedStyle"
                 :title="singleValue.title">
              {{ singleValue.label }}
            </div>
            <template v-if="showSearch">
              <div v-show="open"
                   :class="`${prefixCls}-search ${prefixCls}-search--inline`">
                <div :class="`${prefixCls}-search__field__wrap`">
                  <input ref="searchInput"
                         autocomplete="off"
                         :class="`${prefixCls}-search__field`"
                         :disabled="disabled"
                         :value="inputValue"
                         @input="onSearchInput"
                         @keydown="onInputKeydown">
                  <span :class="`${prefixCls}-search__field__mirror`">
                    {{ inputValue }}
                  </span>
                </div>
              </div>
            </template>
          </template>
          <!--multiple-->
          <template v-else>
            <ul>
              <li v-for="(item,i) in innerValues"
                  :key="i"
                  unselectable="unselectable"
                  :class="itemClasses(item)"
                  :style="unSelectStyle"
                  :tilte="item.title">
                <div :class="`${prefixCls}-selection__choice__content`">
                  {{ getItemContent(item) }}
                </div>
                <span v-if="!item.disabled"
                      :class="`${prefixCls}-selection__choice__remove`"
                      @click.stop.prevent="removeSelected(item)" />
              </li>
              <li :class="`${prefixCls}-search ${prefixCls}-search--inline`">
                <div :class="`${prefixCls}-search__field__wrap`">
                  <input ref="searchInput"
                         autocomplete="off"
                         :class="`${prefixCls}-search__field`"
                         :style="multipleSearchInputStyle"
                         :disabled="disabled"
                         :value="inputValue"
                         @input="onSearchInput"
                         @keydown="onInputKeydown">
                  <span ref="inputMirror"
                        :class="`${prefixCls}-search__field__mirror`">
                    {{ inputValue }}&nbsp;&nbsp;
                  </span>
                </div>
              </li>
            </ul>
          </template>
        </div>
        <!--clear-->
        <span v-if="isShowClear"
              role="clear"
              :class="`${prefixCls}-selection__clear`"
              :style="unSelectStyle"
              unselectable="unselectable"
              @click.stop="onClear" />
        <span role="arrow"
              v-if="!isMultipleOrTags&&showArrow"
              :class="`${prefixCls}-arrow`"
              :style="unSelectStyle"
              unselectable="unselectable">
          <b/>
        </span>
      </div>
    </select-trigger>
    <!--渲染原始option,optionGroup元素 必须-->
    <slot />
  </div>
</template>

<script>
  import Trigger from '@suning/v-trigger';
  import { logFactory, genUUID, toArray, calcMultipleSearchInputWidth } from './utils';
  import SelectTrigger from './selectTrigger.vue';

  const log = logFactory('select:select');

  export default {
    name: 'Select',
    provide() {
      return {
        selectRoot: this,
      };
    },
    components: {
      Trigger,
      SelectTrigger,
    },
    props: {
      prefixCls: {
        type: String,
        default: 'v-select',
      },
      value: {
        type: [String, Number, Array],
        default: '',
      },
      mode: {
        type: String,
        validator(val) {
          return ['combobox', 'multiple', 'default', 'tags'].indexOf(val) > -1;
        },
        default: 'default',
      },
      theme: {
        type: String,
        default: 'light',
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      allowClear: {
        type: Boolean,
        default: false,
      },
      showSearch: {
        type: Boolean,
        default: false,
      },
      placeholder: {
        type: String,
        default: '',
      },
      showArrow: {
        type: Boolean,
        default: true,
      },
      dropdownMatchSelectWidth: {
        type: Boolean,
        default: true,
      },
      dropdownMenuStyle: {
        type: [Array, Object],
        default: undefined,
      },
      getContainer: {
        type: Function,
        default: null,
      },
      filterOption: {
        type: Function,
        default: undefined,
      },
    },
    data() {
      return {
        isSelect: true,
        hasFocused: false,
        align: {
          points: ['tl', 'bl'],
          offset: [0, 4],
          overflow: {
            adjustX: 0,
            adjustY: 1,
          },
        },
        innerValues: [],
        inputValue: '',
        inputMirrorValue: '',
        descendants: [],
        open: false,
        multipleSearchInputStyle: {},
      };
    },
    computed: {
      UUID() {
        return genUUID();
      },
      actions() {
        const { disabled } = this;
        return disabled ? [] : ['click'];
      },
      isDefault() {
        return this.mode === 'default';
      },
      isTags() {
        return this.mode === 'tags';
      },
      isMultiple() {
        return this.mode === 'multiple';
      },
      isCombobox() {
        return this.mode === 'combobox';
      },
      isMultipleOrTags() {
        return this.isMultiple || this.isTags;
      },
      isSingleMode() {
        return this.isDefault;
      },
      isFocused() {
        return this.open || this.hasFocused;
      },
      isShowSearch() {
        const { showSearch, isSingleMode } = this;
        return showSearch || !isSingleMode;
      },
      isShowClear() {
        const { allowClear, inputValue, innerValues } = this;
        return allowClear && (inputValue || innerValues.length);
      },
      classes() {
        const {
          prefixCls, isCombobox, disabled, allowClear, open, isFocused, theme
        } = this;
        return {
          [prefixCls]: true,
          [`${prefixCls}-${theme}`]: true,
          [`${prefixCls}-open`]: open,
          [`${prefixCls}-combobox`]: isCombobox,
          [`${prefixCls}-focused`]: isFocused,
          [`${prefixCls}-disabled`]: disabled,
          [`${prefixCls}-enabled`]: !disabled,
          [`${prefixCls}-allow-clear`]: allowClear,
        };
      },
      selectionClasses() {
        const { prefixCls, isMultipleOrTags } = this;
        const cls = isMultipleOrTags ? 'multiple' : 'single';
        return {
          [`${prefixCls}-selection`]: true,
          [`${prefixCls}-selection--${cls}`]: true,
        };
      },
      unSelectStyle() {
        return {
          userSelect: 'none',
        };
      },
      placeholderStyle() {
        const { inputValue, innerValues } = this;
        return {
          display: inputValue || innerValues.length > 0 ? 'none' : 'block',
          userSelect: 'none',
        };
      },
      singleValue() {
        const { innerValues } = this;
        let ret = {
          title: '',
          label: '',
          value: '',
        };
        if (innerValues.length > 0) {
          [ret] = innerValues;
        }
        return ret;
      },
      singleSelectedStyle() {
        const { showSearch, inputValue, open } = this;
        let [showSearchValue, opacity] = [true, 1];
        if (showSearch && open) {
          if (!inputValue) {
            opacity = 0.4;
          } else {
            showSearchValue = false;
          }
        }
        return {
          display: showSearchValue ? 'block' : 'none',
          opacity,
        };
      },
    },
    watch: {
      value() {
        this.completeValues();
      },
      disabled() {
        if (this.open) {
          this.setOpen(false);
        }
      },
      descendants(nVal) {
        if (nVal) {
          this.completeValues();
        }
      },
    },
    created() {
      this.completeValues();
    },
    methods: {
      forcePopupAlign() {
        const { isMultipleOrTags, $nextTick, updatePopupWidth } = this;
        if (isMultipleOrTags) {
          $nextTick(() => {
            this.$refs.selectTriggerRef.$refs.triggerRef.forcePopupAlign();
          });
        }
        updatePopupWidth();
      },
      updatePopupWidth() {
        const { $refs: { selectTriggerRef } } = this;
        if (selectTriggerRef) {
          this.$nextTick().then(() => {
            selectTriggerRef.setPopupWidth();
          });
        }
      },
      maybeFocus() {
        const { searchInput } = this.$refs;
        this.hasFocused = true;
        if (searchInput) {
          searchInput.focus();
        }
      },
      setOpen(visible) {
        const { setInputValue, maybeFocus } = this;
        this.open = visible;
        if (visible) {
          this.$nextTick(() => {
            maybeFocus();
          });
        } else {
          this.hasFocused = false;
          setInputValue('');
        }
      },
      triggerChange() {
        const { innerValues: values, isMultipleOrTags, forcePopupAlign } = this;
        this.$emit(
          'input',
          isMultipleOrTags ? values.map(v => v.value) : (values[0] || {}).value || ''
        );
        this.$emit('change', isMultipleOrTags ? values : values[0]);
        forcePopupAlign();
      },
      onPopupVisible(visible) {
        this.setOpen(visible);
      },
      onMenuSelect(item) {
        const {
          isMultipleOrTags, triggerChange, maybeFocus, setInputValue
        } = this;
        let { innerValues: values } = this;
        if (isMultipleOrTags) {
          if (values.some(v => v.value === item.value)) {
            return;
          }
          values.push(item);
        } else {
          values = [item];
          this.setOpen(false);
        }
        this.innerValues = values;
        this.$emit('select', item.value, item);
        triggerChange();
        setInputValue('');
        maybeFocus();
      },
      onMenuDeselect(item) {
        this.removeSelected(item);
      },
      onPlaceholderClick() {
        if (this.$refs.searchInput) {
          this.$refs.searchInput.focus();
        }
      },
      onSearchInput(e) {
        const { isMultipleOrTags, forcePopupAlign } = this;
        const { value } = e.target;
        this.setInputValue(value);
        this.setOpen(true);

        if (isMultipleOrTags) {
          this.$nextTick(() => {
            forcePopupAlign();
          });
        }
      },
      onInputKeydown(e) {
        const {
          isMultipleOrTags, inputValue, innerValues: values, removeSelected, open
        } = this;
        // backspace
        if (e.keyCode === 8 || e.key === 'Backspace') {
          if (isMultipleOrTags && inputValue === '') {
            if (values.length) {
              removeSelected(values[values.length - 1]);
            }
          }
        }
        if (e.keyCode === 40 || e.key === 'ArrowDown') {
          if (!open) {
            e.stopPropagation();
            e.preventDefault();
            this.setOpen(true);
          }
        }
        if (e.keyCode === 27 || e.key === 'Escape') {
          if (open) {
            e.stopPropagation();
            e.preventDefault();
            this.setOpen(false);
          }
        }
      },
      onClear() {
        const {
          innerValues: values,
          inputValue,
          triggerChange,
          setInputValue,
          disabled,
          setOpen,
        } = this;

        if (disabled) {
          return;
        }
        if (values.length) {
          this.innerValues = [];
          triggerChange();
        }
        if (inputValue) {
          setInputValue('');
        }
        setOpen(false);
      },
      addDescendant(item) {
        this.descendants.push(item);
        log(
          'addDescendant descendants: %o',
          this.descendants.map(v => ({
            type: v.type,
            name: v.vm.label,
            parentName: v.parent.label,
            uuid: v.vm.UUID,
            parent: v.parent.$options.name,
          }))
        );
      },
      removeDescendant(item) {
        this.descendants = this.descendants.filter(v => v.vm !== item);
        log(
          'removeDesendant descendants: %o',
          this.descendants.map(v => ({
            type: v.type,
            name: v.vm.label,
            parentName: v.parent.label,
            uuid: v.vm.UUID,
            parent: v.parent.$options.name,
          }))
        );
      },
      focus() {
        const { isSingleMode, $refs } = this;
        if (isSingleMode) {
          $refs.selectionRef.focus();
        } else {
          $refs.searchInput.focus();
        }
      },
      blur() {
        const { isSingleMode, $refs } = this;
        if (isSingleMode) {
          $refs.selectionRef.blur();
        } else {
          $refs.searchInput.blur();
        }
      },
      completeValues() {
        const { value, descendants, updatePopupWidth } = this;
        const values = toArray(value).map(v => String(v));

        const m = new Map();
        if (values.length > 0) {
          descendants.reduce((r, v) => {
            const { vm } = v;
            if (vm.isOption && !r.has(vm.value) && values.indexOf(String(vm.value)) !== -1) {
              const val = String(vm.value);
              const label = vm.label || val;
              r.set(val, {
                title: vm.title || label,
                label,
                value: val,
                disabled: vm.disabled,
              });
            }
            return r;
          }, m);
        }
        this.innerValues = Array.from(m.values());
        updatePopupWidth();
      },
      itemClasses(item) {
        const { prefixCls } = this;
        return {
          [`${prefixCls}-selection__choice`]: true,
          [`${prefixCls}-selection__choice__disabled`]: item.disabled,
        };
      },
      getItemContent(item) {
        return item.label;
      },
      removeSelected(item) {
        const {
          innerValues: values, isMultipleOrTags, triggerChange, maybeFocus
        } = this;
        this.innerValues = values.filter(v => v.value !== item.value);

        if (isMultipleOrTags) {
          this.$emit('deselect', item.value, item);
        }
        triggerChange();
        maybeFocus();
      },
      setInputValue(value) {
        const { isMultipleOrTags, $refs } = this;
        this.inputValue = value;
        if (isMultipleOrTags) {
          this.$nextTick(() => {
            this.multipleSearchInputStyle = calcMultipleSearchInputWidth(value, $refs.inputMirror);
          });
        }
      },
    },
  };
</script>
