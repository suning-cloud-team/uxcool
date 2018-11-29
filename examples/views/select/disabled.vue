<template>
  <div class="demo">
    <h4>disabled</h4>
    <ux-select v-model="value"
               :disabled="disabled"
               allow-clear
               style="width:200px;"
               show-search>
      <ux-option value="A"
                 label="A1" />
      <ux-option value="B"
                 label="B2" />
      <ux-option value="C"
                 label="C3" />
    </ux-select>
    <h4>disabled multiple</h4>
    <ux-select v-model="value"
               :disabled="disabled"
               mode="tags"
               style="width:200px;"
               show-search>
      <ux-option value="A"
                 label="A1"
                 :disabled="false" />
      <ux-option value="B"
                 label="B2" />
      <ux-option value="C"
                 label="C3" />
    </ux-select>
    <h4>disabled date source</h4>
    <ux-select v-model="value1"
               :data-source="list"
               style="width:200px;"
               show-search />
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
        value: ['A'],
        value1: '',
        disabled: false,
        list: [
          { value: 1, label: 'a-1', disabled: false },
          { value: 2, label: 'a-2', disabled: false },
        ],
      };
    },
    created() {
      setTimeout(() => {
        // this.disabled = true;
        // setTimeout(() => {
        //   this.disabled = false;
        // }, 3500);
        this.list[0].disabled = true;
      }, 1500);
    },
  };
</script>
