<template>
  <ux-auto-complete v-model="value"
                    @search="onSearch"
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
          data = ['@163.com', '@gmail.com', '@126.com'].map(v => `${searchValue}${v}`);
        }
        this.dataSource = data;
      },
    },
  };
</script>

