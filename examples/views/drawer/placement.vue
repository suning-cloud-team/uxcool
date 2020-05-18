<template>
  <div ref="wrapRef"
       class="demo">
    <h4>placement</h4>
    <ux-button @click="onClick">open</ux-button>
    <ux-radio-group v-model="placement">
      <ux-radio value="top" />top
      <ux-radio value="left" />left
      <ux-radio value="right" />right
      <ux-radio value="bottom" />bottom
    </ux-radio-group>
    <ux-drawer v-model="visible"
               :placement="placement"
               :get-container="container">
      {{ content }}
    </ux-drawer>
  </div>

</template>

<script>
  import { Drawer, Button, Radio } from '@cloud-sn/uxcool';

  export default {
    components: {
      UxDrawer: Drawer,
      UxButton: Button,
      UxRadio: Radio,
      UxRadioGroup: Radio.Group,
    },
    data() {
      return {
        container: null,
        content: 'hello content',
        visible: false,
        placement: 'right',
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
