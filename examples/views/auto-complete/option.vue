<template>
  <div class="demo">
    <h4>option</h4>
    value: {{ value }}
    <ux-auto-complete v-model="value"
                      @search="onSearch"
                      @change="onChange"
    >
      <ux-option v-for="(option,i) in dataSource"
                 :key="i"
                 :value="option"
      >
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
        dataSource: [],
      };
    },
    methods: {
      onChange(...args) {
        console.log('onChange', ...args);
      },
      onSearch(searchValue) {
        let data = [];

        if (searchValue && searchValue.indexOf('@') === -1) {
          data = ['@163.com', '@gmail.com', '@126.com'].map((v) => `${searchValue}${v}`);
        }
        this.dataSource = data;
      },
    },
  };
</script>
