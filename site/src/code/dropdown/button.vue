<template>
  <div>
    <ux-dropdown-button>
      dropdown button
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
    </ux-dropdown-button>

    <ux-dropdown-button disabled>
      dropdown button
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
    </ux-dropdown-button>
  </div>
</template>

<script>
  export default {};
</script>
