<template>
  <div>
    <div class="demo">
      <ux-dropdown>
        <span slot="trigger"
              :class="c"
              dd="a">trigger</span>
        <div slot="overlay">abc</div>
      </ux-dropdown>
      <ux-dropdown>
        <ux-icon type="filter"
                 :class="c"
                 slot="trigger"
                 dd="a">trigger</ux-icon>
        <div slot="overlay">abc</div>
      </ux-dropdown>
    </div>
  </div>
</template>
<script>
  import '@suning/uxcool/src/components/dropdown/style/index.scss';
  import UxIcon from '@suning/uxcool/src/components/icon';
  import UxDropdown from '@suning/uxcool/src/components/dropdown';

  export default {
    components: {
      UxIcon,
      UxDropdown,
    },
    data() {
      return {
        c: 'abc',
      };
    },
  };
</script>
