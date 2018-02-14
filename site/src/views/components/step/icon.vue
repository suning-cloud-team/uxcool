<template>
  <ux-demo title="自定义图标"
           vertical>
    <div slot="demo">
      <ux-steps current="1"
                :theme="theme">
        <ux-step title="User"
                 desc="这是描述1">
          <i slot="icon"
             class="fu fu-account"></i>
        </ux-step>
        <ux-step title="Edit"
                 icon="edit"
                 desc="这是描述2"></ux-step>
        <ux-step title="Detail"
                 icon="more"
                 desc="这是描述3"></ux-step>
        <ux-step title="Save"
                 icon="save"
                 desc="这是描述4"></ux-step>
      </ux-steps>
    </div>
    <div slot="desc">可以通过
      <code>icon</code>属性或者slot指定图标</div>
    <ux-code slot="code">
      {{code}}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/step/icon';

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
