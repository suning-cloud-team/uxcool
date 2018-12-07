<template>
  <div>
    <ux-button @click="onClick">open</ux-button>
    <ux-drawer v-model="visible"
               closable>
      <span slot="title"
            style="color:red">this is title</span>
    </ux-drawer>
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
    methods: {
      onClick() {
        const { visible } = this;
        this.visible = !visible;
      },
    },
  };
</script>
