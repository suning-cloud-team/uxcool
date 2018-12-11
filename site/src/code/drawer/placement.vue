<template>
  <div>
    <ux-button @click="onClick">open</ux-button>
    <ux-radio-group v-model="placement">
      <ux-radio value="top" />top
      <ux-radio value="left" />left
      <ux-radio value="right" />right
      <ux-radio value="bottom" />bottom
    </ux-radio-group>
    <ux-drawer v-model="visible"
               :placement="placement">
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
        placement: 'right',
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
