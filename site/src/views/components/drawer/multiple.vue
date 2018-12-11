<template>
  <ux-demo :height="200"
           title="多层级抽屉">
    <div slot="demo">
      <ux-button @click="onClick">open</ux-button>
      <ux-drawer v-model="visible">
        <ux-button @click="onTwoClick">open two level</ux-button>
        <ux-drawer v-model="twoVisible"
                   destroy-on-close>
          two level drawer
        </ux-drawer>
      </ux-drawer>
    </div>
    <div slot="desc">
      抽屉内打开新抽屉, 解决复杂交互的问题
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/drawer/multiple.vue';

  export default {
    data() {
      return {
        code,
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
