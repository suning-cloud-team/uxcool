<template>
  <div>
    <ux-button @click="onClick">open</ux-button>
    <ux-drawer v-model="visible">
      <ux-button @click="onTwoClick">open two level</ux-button>
      <ux-drawer v-model="twoVisible"
                 destroy-on-close>
        two level drawer
      </ux-drawer>
    </ux-drawer>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        content: 'hello content',
        visible: false,
        twoVisible: true,
      };
    },
    methods: {
      onClick() {
        const { visible } = this;
        this.visible = !visible;
      },
      onTwoClick() {
        const { twoVisible } = this;
        this.twoVisible = !twoVisible;
      },
    },
  };
</script>
