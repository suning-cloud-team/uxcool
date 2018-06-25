<template>
  <ux-demo :height="200"
           title="基本用法">
    <div slot="demo">
      <ux-dropdown>
        <a slot="trigger">hover me
          <ux-icon type="down" />
        </a>
        <ux-menu slot="overlay"
                 multiple>
          <ux-menu-item name="sub-menu-item-3-1">sub-menu-item-1</ux-menu-item>
          <ux-menu-item name="sub-menu-item-3-2">sub-menu-item-2</ux-menu-item>
          <ux-menu-item name="sub-menu-item-4">
            测试3
          </ux-menu-item>
          <ux-menu-item name="sub-menu-item-4">
            测试4
          </ux-menu-item>
        </ux-menu>
      </ux-dropdown>
    </div>
    <div slot="desc">
      基本用法
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/dropdown/basic.vue';

  export default {
    data() {
      return {
        code,
      };
    },
  };
</script>
