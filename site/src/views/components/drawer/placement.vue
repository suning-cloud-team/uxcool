<template>
  <ux-demo :height="200"
           title="位置">
    <div slot="demo">
      <ux-button @click="onClick">open</ux-button>
      <ux-radio-group v-model="placement">
        <ux-radio value="top" />top
        <ux-radio value="left" />left
        <ux-radio value="right" />right
        <ux-radio value="bottom" />bottom
      </ux-radio-group>
      <ux-drawer v-model="visible"
                 :placement="placement">
        {{ content }}
      </ux-drawer>
    </div>
    <div slot="desc">
      设置抽屉从指定位置划出
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/drawer/placement.vue';

  export default {
    data() {
      return {
        code,
        content: 'hello content',
        visible: false,
        placement: 'right',
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
