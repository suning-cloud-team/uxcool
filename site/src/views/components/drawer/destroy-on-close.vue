<template>
  <ux-demo :height="200"
           title="关闭时销毁子元素">
    <div slot="demo">
      <ux-button @click="onClick">open</ux-button>
      <ux-drawer v-model="visible"
                 destroy-on-close>
        {{ content }}
      </ux-drawer>
    </div>
    <div slot="desc">
      关闭时销毁子元素
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/drawer/destroy-on-close.vue';

  export default {
    data() {
      return {
        code,
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
