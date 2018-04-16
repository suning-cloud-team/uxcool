<template>
  <div>
    <ux-avatar size="large">
      {{ name }}
    </ux-avatar>
    <ux-button @click="change">change</ux-button>
  </div>
</template>

<script>
  const names = ['A', 'Ab', 'Abc', 'Abcd', 'Abcde', 'Abcdef'];

  export default {
    data() {
      return {
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
