<template>
  <ux-demo title="可关闭警告提示"
           :height="200">
    <div slot="demo">
      <ux-alert message="Success Tip"
                type="success"
                closable/>
      <ux-alert message="Close Text"
                close-text="Close Now" />

      <ux-alert type="success"
                message="Success Tip"
                description="This is a success description"
                show-icon
                closable
                @close="onClose"
                @after-close="onAfterClose" />
    </div>
    <div slot="desc">
      显示关闭按钮,点击关闭警告提示. 设置
      <code>close-text</code>属性,自定义关闭按钮
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/alert/closable.vue';

  export default {
    data() {
      return {
        code,
      };
    },
    methods: {
      onClose() {
        console.log('on close');
      },
      onAfterClose() {
        console.log('on after close');
      },
    },
  };
</script>
