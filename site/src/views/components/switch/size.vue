<template>
  <ux-demo title="大小"
           vertical>
    <div slot="demo">
      <ux-switch />
      <ux-switch size="small" />
    </div>
    <div slot="desc">
      <code>size='small'</code>表示小号开关
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/switch/size';

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


