<template>
  <div :class="classes">
    <div v-if="haveQuickJumper"
         :class="jumperClasses">
      {{locale.jump_to}}
      <input type="text"
             v-model="pageNo"
             @keyup.enter="go" /> {{locale.page}}
      <button v-if="haveConfirmBtn"
              @click="go"
              @keyup.enter="go">
        {{locale.confirm}}
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Options',
    props: {
      rootPrefixCls: String,
      haveQuickJumper: {
        type: Boolean,
        default: true
      },
      locale: Object,
      haveConfirmBtn: Boolean,
      current: Number
    },
    data() {
      return {
        pageNo: ''
      };
    },
    computed: {
      componentClass() {
        return `${this.rootPrefixCls}-options`;
      },
      classes() {
        const componentClass = this.componentClass;
        return {
          [componentClass]: true
        };
      },
      jumperClasses() {
        const componentClass = this.componentClass;
        return {
          [`${componentClass}-quick-jumper`]: true
        };
      }
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
      }
    }
  };
</script>

