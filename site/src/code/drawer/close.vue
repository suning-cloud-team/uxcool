<template>
  <div>
    <ux-button @click="onClick">open</ux-button>
    <ux-drawer v-model="visible"
               :mask-closable="false"
               closable>
      {{ content }}
    </ux-drawer>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        content: 'this is drawer content',
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

