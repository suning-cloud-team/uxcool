<template>
  <ux-demo :height="200"
           title="">
    <div slot="demo"
         ref="wrapRef">
      <ux-button @click="onClick">open</ux-button>
      <ux-drawer v-model="visible"
                 :get-container="container"
                 z-index="1020">
        <div style="height:1000px">{{ content }}</div>
      </ux-drawer>
    </div>
    <div slot="desc">
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/drawer/basic.vue';

  export default {
    data() {
      return {
        code,
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

