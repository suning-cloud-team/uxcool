<template>
  <ux-demo title="步骤出错"
           vertical>
    <div slot="demo">
      <ux-steps current="1"
                status="error"
                :theme="theme">
        <ux-step title="已完成"
                 desc="这是描述1"></ux-step>
        <ux-step title="进行中"
                 desc="这是描述2"></ux-step>
        <ux-step title="待运行"
                 desc="这是描述3"></ux-step>
        <ux-step title="待运行"
                 desc="这是描述4"></ux-step>
      </ux-steps>
    </div>
    <div slot="desc">设置
      <code>status</code>为
      <code>error</code>指定当前步骤为出错状态。</div>
    <ux-code slot="code">
      {{code}}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/step/error';

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

