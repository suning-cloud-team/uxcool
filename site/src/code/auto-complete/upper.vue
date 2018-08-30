<template>
  <ux-auto-complete v-model="value"
                    :filter-option="filterOption"
                    @change="onChange">
    <ux-option v-for="(option,i) in dataSource"
               :key="i"
               :value="option">
      {{ option }}
    </ux-option>
  </ux-auto-complete>
</template>

<script>
  export default {
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

