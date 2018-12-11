<template>
  <ux-demo :height="200"
           title="自定义宽度">
    <div slot="demo">
      <ux-button @click="onClick">open</ux-button>
      <ux-drawer v-model="visible"
                 closable
                 width="500" />
    </div>
    <div slot="desc">
      宽度自定义
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/drawer/width.vue';

  export default {
    data() {
      return {
        code,
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
      onClick() {
        const { visible } = this;
        this.visible = !visible;
      },
    },
  };
</script>
