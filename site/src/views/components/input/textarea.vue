<template>
  <ux-demo title="文本域">
    <ux-textarea slot="demo"
                 row="4" :theme="theme">
    </ux-textarea>
    <div slot="desc">多行输入</div>
    <ux-code slot="code">
      {{code}}
    </ux-code>
  </ux-demo>
</template>


<script>
import code from '@/code/input/textarea';

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
