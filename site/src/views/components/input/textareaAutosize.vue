<template>
  <div>
    <ux-demo title="文本高度自适应">
      <div slot="demo">
        <ux-textarea :textarea-style="{resize:'none'}"
                     :auto-size="true"
                     novalidate
                     placeholder="测试用"
                     class="custom-class">
        </ux-textarea>
        <ux-textarea :auto-size="{minRows:2, maxRows:6}"
                     :textarea-style="{resize:'none'}"
                     novalidate
                     placeholder="测试用"
                     class="custom-class">
        </ux-textarea>
      </div>
      <div slot="desc">auto-size属性适用于ux-textarea组件, 使其自适应内部文本高度, 且auto-size属性可设置为对象, 制定最小行和最大行</div>
      <ux-code slot="code">
        {{ code }}
      </ux-code>
    </ux-demo>
  </div>
</template>


<script>
  import code from '@/code/input/textareaAutosize.vue';

  export default {
    data() {
      return { code };
    },
    computed: {
      theme() {
        return this.$store.state.theme;
      },
    },
  };
</script>

<style scoped>
  textarea + textarea {
    margin-top: 10px;
  }
</style>
