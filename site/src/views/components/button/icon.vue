<template>
  <ux-demo title="图表按钮"
           vertical>
    <div slot="demo"
         class="gutter-group">
      <ux-button type="primary"
                 @click="onClick"
                 @click.native="onNativeClick"
                 shape="circle"
                 icon="search" />
      <ux-button type="primary"
                 icon="search">Search</ux-button>
      <ux-button shape="circle"
                 icon="search" />
      <ux-button icon="search">Search</ux-button>
      <br>
      <ux-button shape="circle"
                 icon="search" />
      <ux-button icon="search">Search</ux-button>
      <ux-button type="dashed"
                 shape="circle"
                 icon="search" />
      <ux-button type="dashed"
                 icon="search">Search</ux-button>
    </div>
    <div slot="desc">
      通过
      <code>icon</code>属性设置按钮图标, 也可通过
      <code>UxIcon</code>组件自定义图标及位置
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/button/icon';

  export default {
    data() {
      return {
        code,
      };
    },
    computed: {
      theme() {
        return this.$store.state.theme;
      },
    },
    methods: {
      onClick() {
        console.log('click');
      },
      onNativeClick(e) {
        console.log('native click', e);
      },
    },
  };
</script>
