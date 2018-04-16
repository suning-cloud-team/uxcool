<template>
  <ux-demo title="自动调整字符大小"
           :height="200">
    <div slot="demo">
      <ux-avatar size="large">
        {{ name }}
      </ux-avatar>
      <ux-button @click="change">change</ux-button>
    </div>
    <div slot="desc">
      字符型头像,当字符串较长时,字体大小可以根据头像宽度自动调整
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/avatar/scale.vue';

  const names = ['A', 'Ab', 'Abc', 'Abcd', 'Abcde', 'Abcdef'];

  export default {
    data() {
      return {
        code,
        idx: 0,
        name: '',
      };
    },
    created() {
      this.name = names[this.idx];
    },
    methods: {
      change() {
        const idx = this.idx + 1;
        this.idx = idx;
        this.name = names[idx % names.length];
      },
    },
  };
</script>

<style scoped>
  .ux-avatar {
    margin: 10px 10px 0 0;
  }
</style>
