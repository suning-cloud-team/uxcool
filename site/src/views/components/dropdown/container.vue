<template>
  <ux-demo :height="200"
           title="自定义渲染区域">
    <div slot="demo">
      <div ref="containerRef"
           class="demo">
        <ux-dropdown :get-popup-container="getContainer">
          <ux-icon slot="trigger"
                   type="filter">trigger</ux-icon>
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
    </div>
    <div slot="desc">
      通过
      <code>get-popup-container</code>属性,自定义渲染区域
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/dropdown/container.vue';

  export default {
    data() {
      return {
        code,
        visible: false,
      };
    },
    methods: {
      getContainer() {
        return this.$refs.containerRef;
      },
    },
  };
</script>

