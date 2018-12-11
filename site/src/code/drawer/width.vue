<template>
  <div>
    <ux-button @click="onClick">open</ux-button>
    <ux-drawer v-model="visible"
               closable
               width="500" />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        content: 'hello content',
        visible: false,
      };
    },
    created() {
      setTimeout(() => {
        // this.container = this.getContainer;
        this.content = 'this is drawer content ';
      }, 1500);
    },
    methods: {
      onClick() {
        const { visible } = this;
        this.visible = !visible;
      },
    },
  };
</script>
