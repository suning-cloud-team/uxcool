<template>
  <div>
    <div class="demo">
      <popconfirm>
        内嵌模式
        <div slot="title">
          <ux-select style="width:200px;">
            <ux-option value="A"
                       label="A1" />
            <ux-option value="B"
                       label="B2" />
            <ux-option value="C"
                       label="C3" />
          </ux-select>
        </div>
      </popconfirm>
    </div>
  </div>
</template>


<script>
  import { Popconfirm, Select } from '@cloud-sn/uxcool';

  export default {
    components: {
      Popconfirm,
      UxSelect: Select,
      UxOption: Select.Option,
    },
  };
</script>

<style lang="scss">
  .ux-select-dropdown {
    z-index: 1050;
  }
</style>
