<template>
  <div ref="wrapRef"
       class="demo">
    <h4>Style</h4>
    <ux-button @click="onClick">open</ux-button>
    <ux-drawer v-model="visible"
               :mask-style="{color:'green'}"
               wrapper-class="wrap-class"
               body-class="body-class">
      {{ content }}
    </ux-drawer>
  </div>

</template>

<script>
  import { Drawer, Button } from '@suning/uxcool';

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
