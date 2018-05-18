<template>
  <ux-demo title="前缀/后缀">
    <div slot="demo">
      <ux-input name="input2"
                id="id2"
                style="color:red"
                placeholder="input2">
        <ux-icon slot="prefix"
                 type="account_more" />
        <ux-icon slot="suffix"
                 type="close_circle" />
      </ux-input>
    </div>
    <div slot="desc">
      添加图标 前缀/后缀
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>


<script>
  import code from '@/code/input/prefix.vue';

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
