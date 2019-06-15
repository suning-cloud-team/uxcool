<template>
  <ux-demo title="跳转">
    <div slot="demo">
      <ux-pagination :theme="theme"
                     :current="5"
                     :total="500"
                     show-quick-jumper />
      <br>
      <ux-pagination :theme="theme"
                     :current="5"
                     :total="500"
                     :show-quick-jumper-confirm-btn="false"
                     show-quick-jumper />
    </div>
    <div slot="desc">通过<code>show-quick-jumper</code>属性设置显示快速跳转，通过<code>show-quick-jumper-confirm-btn</code>设置是否显示确定按钮</div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>
<script>
  import code from '@/code/pagination/goto.vue';

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
