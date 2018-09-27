<template>
  <ux-dropdown>
    <a slot="trigger">hover me
      <ux-icon type="down" />
    </a>
    <ux-menu slot="overlay">
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
</template>

<script>
  export default {};
</script>
