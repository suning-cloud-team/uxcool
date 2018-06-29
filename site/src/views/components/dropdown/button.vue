<template>
  <ux-demo :height="200"
           title="按钮下拉框">
    <div slot="demo">
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
    <div slot="desc">
      左边是按钮, 右边是下拉框
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/dropdown/button.vue';

  export default {
    data() {
      return {
        code,
      };
    },
  };
</script>
<style scoped>
  .demo .ux-btn-group {
    margin-left: 10px;
  }
</style>
