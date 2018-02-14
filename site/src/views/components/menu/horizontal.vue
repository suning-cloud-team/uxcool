<template>
  <div>
    <ux-demo title="顶部菜单">
      <ux-menu slot="demo"
               :theme="theme"
               mode="horizontal">
        <ux-sub-menu name="sub-menu-1"
                     title="sub-menu-1">
          <ux-menu-item name="sub-menu-1-1">sub-menu-1-1</ux-menu-item>
          <ux-menu-item name="sub-menu-1-2">sub-menu-1-2</ux-menu-item>
        </ux-sub-menu>
        <ux-sub-menu name="sub-menu-2"
                     title="sub-menu-2">
          <ux-menu-item disabled
                        name="sub-menu-2-1">sub-menu-1-1</ux-menu-item>
          <ux-sub-menu title="sub-menu-2-2"
                       name="sub-menu-2-2">
            <ux-menu-item name="sub-menu-2-2-1">sub-menu-1-1</ux-menu-item>
            <ux-menu-item name="sub-menu-2-2-2">sub-menu-1-2</ux-menu-item>
          </ux-sub-menu>
        </ux-sub-menu>
        <ux-sub-menu name="sub-menu-3"
                     title="sub-menu-3">
          <ux-menu-item-group title="测试-group">
            <ux-menu-item name="sub-menu-3-1-1">sub-menu-3-1-1</ux-menu-item>
          </ux-menu-item-group>
          <ux-menu-item-group title="测试-group">
            <ux-menu-item name="sub-menu-3-2-1">sub-menu-3-2-1</ux-menu-item>
          </ux-menu-item-group>
          <ux-menu-item name="sub-menu-3-3"
                        title="sub-menu-3-3">
            sub-menu-3-3
          </ux-menu-item>
          <ux-sub-menu name="sub-menu-3-4"
                       title="sub-menu-3-4">
            <ux-menu-item name="sub-menu-3-4-1">sub-menu-3-4-1</ux-menu-item>
            <ux-menu-item name="sub-menu-3-4-2">sub-menu-3-4-2</ux-menu-item>
          </ux-sub-menu>
        </ux-sub-menu>
      </ux-menu>
      <div slot="desc">
        水平导航菜单
      </div>
      <ux-code slot="code">
        {{code}}
      </ux-code>
    </ux-demo>
  </div>
</template>


<script>
  import code from '@/code/menu/horizontal';

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
  };
</script>
