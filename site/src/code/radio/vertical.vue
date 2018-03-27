<template>
  <div>
    <ux-radio-group v-model="opts6Checked"
                    class="radio-group-vertical">
      <ux-radio v-for="(v,k) in opts6"
                :key="k"
                :label="v"
                :value="v"
                style="height:34px;line-height:34px" />
      <ux-radio value="more"
                style="height:34px;line-height:34px">
        <span>more</span>
        <input v-if="opts6Checked === 'more'"
               class="ux-input"
               style="width:100px;margin-left:10px">
      </ux-radio>
    </ux-radio-group>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        opts6: ['1', '2', '3'],
        opts6Checked: '',
      };
    },
  };
</script>

<style lang="scss" scoped>
  /* /deep/是 vue-loader使用的指令 https://vue-loader.vuejs.org/zh-cn/features/scoped-css.html */
  .radio-group-vertical {
    /deep/ .ux-radio-wrapper {
      display: block;
    }
  }
</style>
