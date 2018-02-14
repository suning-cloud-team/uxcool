<template>
  <ux-demo title="圆点"
           vertical>
    <div slot="demo">
      <ux-steps current="1"
                :theme="theme"
                progress-dot>
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
      <code>progress-dot</code>可以圆点形式显示步骤条。</div>
    <ux-code slot="code">
      {{code}}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/step/dot';

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

