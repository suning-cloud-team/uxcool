<template>
  <div>
    <ux-button @click="onClick">open</ux-button>
    <ux-drawer v-model="visible"
               destroy-on-close>
      {{ content }}
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
