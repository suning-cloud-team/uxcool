<template>
  <div ref="wrapRef"
       class="demo">
    <h4>Title</h4>
    <ux-button @click="onClick">open</ux-button>
    <ux-drawer v-model="visible"
               closable>
      <span slot="title"
            style="color:red">this is title</span>
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
