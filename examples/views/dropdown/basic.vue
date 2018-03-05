<template>
  <div>
    <div class="demo">
      <ux-dropdown disabled>
        <input slot="trigger"
               :class="c"
               dd="a">
        <div slot="overlay">abc</div>
      </ux-dropdown>

    </div>
    <div class="demo">
      <ux-dropdown>
        <ux-icon type="filter"
                 slot="trigger">trigger</ux-icon>
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
</template>
<script>
  import '@suning/uxcool/src/components/dropdown/style/index.scss';
  import UxIcon from '@suning/uxcool/src/components/icon';
  import UxDropdown from '@suning/uxcool/src/components/dropdown';
  import { UxMenu, UxMenuItem } from '@suning/uxcool/src/components/menu';

  export default {
    components: {
      UxIcon,
      UxDropdown,
      UxMenuItem,
      UxMenu,
    },
    data() {
      return {
        c: { abc: true },
        d: 'ccc',
      };
    },
  };
</script>
