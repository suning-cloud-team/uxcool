<template>
  <li v-if="haveQuickJumper"
      :class="classes">
    <div :class="jumperClasses">
      {{ locale.jump_to }}
      <input v-model="pageNo"
             type="text"
             @keyup.enter="go"> {{ locale.page }}
      <button v-if="haveConfirmBtn"
              @click="go"
              @keyup.enter="go">
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
        const componentClass = this.componentClass;
        return {
          [componentClass]: true,
        };
      },
      jumperClasses() {
        const componentClass = this.componentClass;
        return {
          [`${componentClass}-quick-jumper`]: true,
        };
      },
    },
    methods: {
      go() {
        const { current, pageNo } = this;
        if (pageNo.trim() === '') return;

        let no = Number(pageNo);
        if (isNaN(no)) {
          no = current;
        }
        this.pageNo = '';
        this.$emit('on-quick-jumper', no);
      },
    },
  };
</script>

