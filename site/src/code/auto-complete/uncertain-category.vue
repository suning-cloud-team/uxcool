<template>
  <ux-auto-complete v-model="value"
                    :data-source="dataSource"
                    :dropdown-match-select-width="false"
                    size="large"
                    style="width:100%"
                    @search="onSearch"
                    @change="onChange">
    <template slot="renderInputElement">
      <ux-search-input :enter-button="true"
                       @search="onSearchInput" />
    </template>
    <template slot="renderLabel"
              slot-scope="{value ,label, cnt}">
      <span>{{ label }}在</span>
      <a href="###">{{ value }}</a>区块中
      <span>约 {{ cnt }} 个结果</span>
    </template>
  </ux-auto-complete>
</template>

<script>
  function getRandomInt(max, min = 0) {
    // eslint-disable-next-line no-mixed-operators
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function mockData(query) {
    const cnt = getRandomInt(5, 1);
    console.log(cnt);
    return Array(cnt)
      .fill(0)
      .map((_, i) => ({
        value: `${query}${i}`,
        label: query,
        cnt: getRandomInt(300, 50),
      }));
  }

  export default {
    data() {
      return {
        lazy: {
          remain: 10,
        },
        popupStyle: { minWidth: '300px' },
        value: '',
        dataSource: [],
      };
    },
    methods: {
      onChange(...args) {
        console.log('onChange', ...args);
      },
      onSearch(value, e) {
        this.dataSource = value ? mockData(value) : [];
      },
      onSearchInput(...args) {
        console.log('onSearchInput', ...args);
      },
    },
  };
</script>
