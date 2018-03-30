<template>
  <ux-demo title="基本"
           vertical>
    <div slot="demo">
      <ux-tag :theme="theme">Tag 1</ux-tag>
      <ux-tag :theme="theme">
        <a href="https://www.suning.com"
           target="_blank">Link</a>
      </ux-tag>
      <ux-tag closable
              :theme="theme">
        <a href="https://www.suning.com"
           target="_blank">Link closable</a>
      </ux-tag>
      <ux-tag closable
              :theme="theme"
              @close="onClose"
              @after-close="onAfterClose">Tag 2</ux-tag>
      <ux-tag closable
              :theme="theme">Tag 3</ux-tag>
      <ux-tag closable
              :theme="theme"
              @after-close="onAfterClose">Tag 4</ux-tag>
    </div>
    <div slot="desc">标签的基本用法,
      <code>closable</code>可设置标签可关闭
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>
<script>
  import code from '@/code/tag/basic.vue';

  export default {
    data() {
      return {
        code,
      };
    },
    computed: {
      theme() {
        return this.$store.state.theme;
      },
    },
    methods: {
      onClose(e) {
        console.log('close', e);
      },
      onAfterClose(e) {
        console.log('onAfterClose', e);
      },
    },
  };
</script>

