<template>
  <div ref="wrap"
       :class="classes">
    <ul @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave">
      <li ref="options"
          v-for="(item,i) in list"
          :key="i"
          :class="optionClasses(item, i)"
          @click="onSelect(item,i)"
          :disabled="item.disabled">
        {{item.value}}
      </li>
    </ul>
  </div>
</template>


<script>
  import { scrollTo } from './utils';

  export default {
    name: 'TimePickerSelect',
    props: {
      prefixCls: String,
      list: Array,
      selectedIndex: Number,
      type: String,
    },
    data() {
      return {
        active: false,
        duration: 120,
      };
    },
    mounted() {
      this.scrollToTarget(0);
    },
    computed: {
      classes() {
        const { prefixCls, active } = this;
        return {
          [`${prefixCls}-select`]: true,
          [`${prefixCls}-select-active`]: active,
        };
      },
    },
    methods: {
      optionClasses(item, i) {
        const { prefixCls, selectedIndex } = this;
        return {
          [`${prefixCls}-select-option-selected`]: i === selectedIndex,
          [`${prefixCls}-select-option-disabled`]: item.disabled,
        };
      },
      onSelect(item, idx) {
        if (item.disabled || idx === this.selectedIndex) {
          return;
        }
        this.$emit('on-select', item);
      },
      onMouseEnter(e) {
        this.active = true;
        this.$emit('on-mouse-enter', e);
      },
      onMouseLeave() {
        this.active = false;
      },
      scrollToTarget(duration) {
        const { $refs, selectedIndex } = this;
        const { options = [], wrap } = $refs;
        let idx = selectedIndex;

        if (options.length === 0) {
          return;
        }
        if (idx < 0) {
          idx = 0;
        }
        if (idx >= options.length) {
          idx = options.length - 1;
        }

        const target = options[idx];

        scrollTo(wrap, target.offsetTop, duration);
      },
    },
    watch: {
      selectedIndex(nVal, oVal) {
        if (nVal !== oVal) {
          this.scrollToTarget(this.duration);
        }
      },
    },
  };
</script>