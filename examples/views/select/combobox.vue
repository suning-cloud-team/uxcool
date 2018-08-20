<template>
  <div class="demo">
    value: {{ value }}
    <ux-select v-model="value"
               option-label-prop="children"
               option-filter-prop="label"
               mode="SECRET_COMBOBOX_MODE_DO_NOT_USE"
               style="width:200px;">
      <ux-option v-for="(item,i) in list"
                 :key="i"
                 :value="item.value"
                 :label="item.label">
        <div>
          <span> {{ item.value }}</span>
          <ux-icon type="circle_selected" /> {{ item.label }}
        </div>

      </ux-option>
      <!-- <ux-option v-for="(item,i) in list"
                 :key="i"
                 :value="item.value"
                 :label="item.label" /> -->
    </ux-select>
  </div>
</template>

<script>
  import { Select, Icon } from '@suning/uxcool';

  export default {
    components: {
      UxSelect: Select,
      UxOption: Select.Option,
      UxIcon: Icon,
    },
    data() {
      return {
        value: 'B',
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

