<template>
  <div ref="wrapRef">
    <ux-button @click="onClick">open</ux-button>
    <ux-drawer v-model="visible"
               :get-container="container"
               z-index="1020">
      <div style="height:1000px">{{ content }}</div>
    </ux-drawer>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        container: null,
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
      getContainer() {
        return this.$refs.wrapRef;
      },
      onClick() {
        const { visible } = this;
        this.visible = !visible;
      },
    },
  };
</script>

