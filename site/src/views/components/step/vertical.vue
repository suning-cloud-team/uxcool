<template>
  <ux-demo title="竖直步骤条">
    <div slot="demo">
      <ux-steps current="1"
                direction="vertical"
                :theme="theme">
        <ux-step title="已完成"
                 desc="这是描述文字1"></ux-step>
        <ux-step title="进行中"
                 desc="这是描述文字2"></ux-step>
        <ux-step title="待运行"
                 desc="这是描述文字3"></ux-step>
        <ux-step title="待运行"
                 desc="这是描述文字4"></ux-step>
      </ux-steps>
    </div>
    <div slot="desc">设置
      <code>direction</code>为
      <code>vertical</code>可以使步骤条显示为竖直方向。</div>
    <ux-code slot="code">
      {{code}}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/step/vertical';

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
  };
</script>

