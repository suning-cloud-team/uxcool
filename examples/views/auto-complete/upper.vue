<template>
  <div class="demo">
    <h4>upper</h4>
    value: {{ value }}
    <ux-auto-complete v-model="value"
                      :filter-option="filterOption"
                      @change="onChange">
      <ux-option v-for="(option,i) in dataSource"
                 :key="i"
                 :value="option">
        {{ option }}
      </ux-option>
    </ux-auto-complete>
  </div>
</template>


<script>
  import { AutoComplete, Select } from '@cloud-sn/uxcool';

  export default {
    components: {
      UxAutoComplete: AutoComplete,
      UxOption: Select.Option,
    },
    data() {
      return {
        value: '',
        dataSource: ['Beijing', 'ShangHai', 'JiangSu'],
      };
    },
    methods: {
      onChange(...args) {
        console.log('onChange', ...args);
      },
      filterOption(searchValue, option) {
        return option.value.toLowerCase().indexOf(searchValue.toLowerCase()) > -1;
      },
    },
  };
</script>
