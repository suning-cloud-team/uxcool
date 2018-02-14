<template>
  <ux-demo title="自定义标题">
    <div slot="demo">
      <ux-popover content="无标题"
                  :theme="theme">
        无标题
      </ux-popover>
      <br>
      <ux-popover :content="innerContent">
        自定义标题
        <span slot="title"
              style="color:red">标题红</span>
      </ux-popover>
    </div>
    <div slot="desc"></div>
    <ux-code slot="code">
      {{code}}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/popover/title';

  export default {
    data() {
      return {
        code,
        innerContent: '测试内容2',
      };
    },
    computed: {
      theme() {
        return this.$store.state.theme;
      },
    },
  };
</script>
