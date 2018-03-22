<template>
  <ux-demo title="文字和图标"
           vertical>
    <div slot="demo">
      <ux-switch checked-children="开"
                 unchecked-children="关" />
      <br>
      <ux-switch>
        <span slot="checkedChildren">
          <ux-icon type="setting" />
        </span>
        <span slot="uncheckedChildren">
          <ux-icon type="safty" />
        </span>
      </ux-switch>
    </div>
    <div slot="desc">
      自定义文案或图标
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/switch/text';

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
