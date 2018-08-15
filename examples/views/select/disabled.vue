<template>
  <div class="demo">
    <h4>disabled</h4>
    <ux-select :disabled="disabled"
               style="width:200px;"
               show-search>
      <ux-option value="A"
                 label="A1" />
      <ux-option value="B"
                 label="B2" />
      <ux-option value="C"
                 label="C3" />
    </ux-select>
  </div>

</template>
<script>
  import { Select } from '@suning/uxcool';

  export default {
    components: {
      UxSelect: Select,
      UxOption: Select.Option,
      UxOptionGroup: Select.Group,
    },
    data() {
      return {
        disabled: false,
      };
    },
    created() {
      setTimeout(() => {
        this.disabled = true;
        setTimeout(() => {
          this.disabled = false;
        }, 3500);
      }, 1500);
    },
  };
</script>
