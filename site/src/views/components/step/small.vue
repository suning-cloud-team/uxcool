<template>
  <ux-demo title="迷你"
           vertical>
    <div slot="demo">
      <ux-steps current="1"
                size="small"
                :theme="theme">
        <ux-step title="已完成"
                 desc="这是描述1">
          <span slot="title"
                style="color:green">
            已完成!!
          </span>
        </ux-step>
        <ux-step title="进行中">
          <span slot="desc"
                style="color: grey">
            这是描述2
          </span>
        </ux-step>
        <ux-step title="待运行"
                 desc="这是描述3"></ux-step>
        <ux-step title="待运行"
                 desc="这是描述4"></ux-step>
      </ux-steps>

      <ux-steps current="1"
                size="small"
                :theme="theme"
                direction="vertical">
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
      <code>size</code>为
      <code>small</code>可以使步骤条显示为迷你版。</div>
    <ux-code slot="code">
      {{code}}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/step/small';

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

