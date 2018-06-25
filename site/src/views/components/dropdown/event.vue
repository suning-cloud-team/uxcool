<template>
  <ux-demo :height="200"
           title="事件">
    <div slot="demo">
      <ux-dropdown @overlay-click="onClick">
        <a slot="trigger">hover me and click overlay item
          <ux-icon type="down" />
        </a>
        <ux-menu slot="overlay">
          <ux-menu-item name="sub-menu-item-3-1">sub-menu-item-1</ux-menu-item>
          <ux-menu-item name="sub-menu-item-3-2">sub-menu-item-2</ux-menu-item>
          <ux-menu-item name="sub-menu-item-4"
                        disabled>
            测试3
          </ux-menu-item>
          <ux-menu-item name="sub-menu-item-4">
            测试4
          </ux-menu-item>
        </ux-menu>
      </ux-dropdown>
    </div>
    <div slot="desc">
      点击菜单后触发相应事件
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/dropdown/event.vue';
  import { UxMessage } from '@suning/uxcool';

  export default {
    data() {
      return {
        code,
      };
    },
    methods: {
      onClick({ item }) {
        UxMessage.info(item.name);
      },
    },
  };
</script>

