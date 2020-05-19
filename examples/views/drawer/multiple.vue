<template>
  <div ref="wrapRef"
       class="demo">
    <h4>multiple</h4>
    <ux-button @click="onClick">open</ux-button>
    <ux-drawer v-model="visible"
               :get-container="container">
      <ux-button @click="onTwoClick">open two level</ux-button>
      <ux-drawer v-model="twoVisible"
                 destroy-on-close>
        two level drawer
      </ux-drawer>
    </ux-drawer>
  </div>

</template>

<script>
  import { Drawer, Button } from '@cloud-sn/uxcool';

  export default {
    components: {
      UxDrawer: Drawer,
      UxButton: Button,
    },
    data() {
      return {
        container: null,
        content: 'hello content',
        visible: false,
        twoVisible: true,
      };
    },
    methods: {
      getContainer() {
        return this.$refs.wrapRef;
      },
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
