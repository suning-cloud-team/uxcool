<template>
  <div>
    <div class="demo">
      <h4>Scale</h4>
      <avatar size="large">
        {{ name }}</span>
      </avatar>
      <ux-button @click="change">change</ux-button>
    </div>
  </div>
</template>


<script>
  import { Avatar, Button } from '@suning/uxcool';

  const names = ['A', 'Ab', 'Abc', 'Abcd', 'Abcde', 'Abcdef'];

  export default {
    components: {
      Avatar,
      UxButton: Button,
    },
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
