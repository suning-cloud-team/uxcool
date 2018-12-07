<template>
  <ux-demo :height="200"
           title="自定义标题">
    <div slot="demo">
      <ux-button @click="onClick">open</ux-button>
      <ux-drawer v-model="visible"
                 closable>
        <span slot="title"
              style="color:red">this is title</span>
      </ux-drawer>
    </div>
    <div slot="desc">
      标题自定义
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/drawer/title.vue';

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
