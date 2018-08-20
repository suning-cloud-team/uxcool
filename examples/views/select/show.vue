<template>
  <div class="demo">
    <h4>show</h4>
    <div v-show="isShow">
      <ux-select style="width:200px;">
        <ux-option value="A"
                   label="A1" />
        <ux-option value="B"
                   label="B2" />
        <ux-option value="C"
                   label="C3" />
      </ux-select>
    </div>

  </div>
</template>

<script>
  import { Select } from '@suning/uxcool';
  // import { SelectLegacy } from '@suning/uxcool';

  export default {
    components: {
      UxSelect: Select,
      UxOption: Select.Option,
    },
    data() {
      return {
        isShow: false,
        value: 2,
        list: [{ value: 1, label: 'A_1' }, { value: 2, label: 'B_1' }, { value: 3, label: 'C_1' }],
      };
    },
    created() {
      setTimeout(() => {
        this.isShow = true;
      }, 1500);
    },
  };
</script>

