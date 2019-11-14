<template>
  <li v-if="haveQuickJumper"
      :class="classes">
    <div :class="jumperClasses">
      {{ locale.jump_to }}
      <input :value="pageNo"
             type="text"
             @input="onInput"
             @keyup.enter="go"> {{ locale.page }}
      <button v-if="haveConfirmBtn"
              @click="go">
        {{ locale.confirm }}
      </button>
    </div>
  </li>
</template>

<script>
  export default {
    name: 'Options',
    props: {
      rootPrefixCls: String,
      haveQuickJumper: {
        type: Boolean,
        default: true,
      },
      locale: Object,
      haveConfirmBtn: Boolean,
      current: Number,
    },
    data() {
      return {
        pageNo: '',
      };
    },
    computed: {
      componentClass() {
        return `${this.rootPrefixCls}-options`;
      },
      classes() {
        const { componentClass } = this;
        return {
          [componentClass]: true,
        };
      },
      jumperClasses() {
        const { componentClass } = this;
        return {
          [`${componentClass}-quick-jumper`]: true,
        };
      },
    },
    methods: {
      // Q3需求直接不让输入非数字
      // http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/190
      onInput(e) {
        const { target } = e;
        const { value } = target;
        const trimmedVal = value ? value.trim() : '';

        if (trimmedVal === '' || /^\d+$/.test(trimmedVal)) {
          this.pageNo = trimmedVal;
        }
        target.value = this.pageNo;
      },
      go() {
        const { pageNo } = this;

        if (pageNo === '') {
          return;
        }

        const page = Number(pageNo);
        this.pageNo = '';
        this.$emit('on-quick-jumper', page);
      },
    },
  };
</script>

