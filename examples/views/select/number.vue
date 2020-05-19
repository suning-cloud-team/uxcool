<template>
  <div class="demo">
    value: {{ value }}
    <ux-select v-model="value"
               style="width:200px;margin-left:200px;">
      <ux-option v-for="(item,i) in list"
                 :key="i"
                 :value="item.value"
                 :label="item.label" />
    </ux-select>
  </div>
</template>

<script>
  import { Select } from '@cloud-sn/uxcool';

  export default {
    components: {
      UxSelect: Select,
      UxOption: Select.Option,
    },
    data() {
      return {
        value: 2,
        list: [{ value: 1, label: 'A_1' }, { value: 2, label: 'B_1' }, { value: 3, label: 'C_1' }],
      };
    },
  };
</script>

