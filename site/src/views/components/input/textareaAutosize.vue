<template>
  <div>
    <ux-demo title="文本高度自适应">
      <div slot="demo">
        <ux-textarea :textarea-style="{resize:'none'}"
                     :auto-size="true"
                     novalidate
                     placeholder="测试用"
                     class="my-xs-2">
        </ux-textarea>
        <ux-textarea :auto-size="{minRows:2, maxRows:6}"
                     :textarea-style="{resize:'none'}"
                     novalidate
                     placeholder="测试用"
                     class="my-xs-2">
        </ux-textarea>
      </div>
      <div slot="desc">
        <div>
          <code>autoSize</code>属性适用于<code>ux-textarea</code>组件, 使其自适应内部文本高度, 且<code>autoSize</code>属性可设置为对象, 指定最小行和最大行。
        </div>
      </div>
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


