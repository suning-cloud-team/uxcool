<template>
  <ux-demo title="弹窗框样式">
    <div slot="demo">
      <ux-popover content="自定义标题"
                  :theme="theme"
                  :popover-style="{width:'200px'}">
        弹窗框样式
        <span slot="title"
              style="color:red">标题红</span>
        <template slot="content">
          <span style="color:green">这是内容这是内容这是内容这是内容这是内容这是内容这是内容</span>
          <div>额外内容</div>
        </template>
      </ux-popover>
    </div>
    <div slot="desc">
      自定义弹窗样式
    </div>
    <ux-code slot="code">
      {{code}}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/popover/style';

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
