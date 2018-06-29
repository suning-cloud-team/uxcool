<template>
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
</template>

<script>
  export default {
    data() {
      return {
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

