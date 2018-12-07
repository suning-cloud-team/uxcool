<template>
  <ux-demo :height="200"
           title="关闭">
    <div slot="demo">
      <ux-button @click="onClick">open</ux-button>
      <ux-drawer v-model="visible"
                 :mask-closable="false"
                 closable>
        {{ content }}
      </ux-drawer>
    </div>
    <div slot="desc">
      点击右上角按钮关闭drawer
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/drawer/close.vue';

  export default {
    data() {
      return {
        code,
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

