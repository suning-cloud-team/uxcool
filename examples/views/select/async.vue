<template>
  <div class="demo">
    <h4>async</h4>
    value: {{ value }}
    <ux-select v-model="value"
               option-label-prop="label"
               show-search
               style="width:200px;margin-left:200px;">
      <!-- <ux-option value="A">A</ux-option>
      <ux-option value="B">B</ux-option>
      <ux-option value="C">C</ux-option> -->
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
        value: '',
        list: [],
      };
    },
    created() {
      setTimeout(() => {
        this.list.push(
          { value: 'A', label: 'A_1' },
          { value: 'B', label: 'B_1' },
          { value: 'C', label: 'C_1' }
        );
        setTimeout(() => {
          this.list = [
            { value: 'A', label: 'AA_1' },
            { value: 'B', label: 'BB_1' },
            { value: 'C', label: 'CC_1' },
          ];
          // this.value = 'A1';
        }, 1500);
      }, 1500);
    },
  };
</script>

