<template>
  <div class="demo">
    <h4>remote filter</h4>
    value: {{ value }}
    <ux-select v-model="value"
               :data-source="list"
               :not-found-content="null"
               :filter-option="false"
               show-search
               allow-clear
               style="width:200px;"
               @search="onSearch" />
    <h4>remote filter multiple</h4>
    <ux-select :data-source="list"
               :not-found-content="null"
               :filter-option="false"
               mode="multiple"
               show-search
               style="width:200px;"
               @search="onSearch" />
  </div>
</template>

<script>
  import { Select } from '@suning/uxcool';

  function mockData(cnt) {
    return Array(cnt)
      .fill(0)
      .map((_, i) => ({
        value: `${i.toString(36)}i`,
        label: `${i.toString(36)}-${i}`,
    }));
  }
  export default {
    components: {
      UxSelect: Select,
      UxOption: Select.Option,
    },
    data() {
      return {
        value: '',
        source: mockData(200),
        list: [],
      };
    },
    methods: {
      onSearch(val) {
        console.log('filterOption onSearch', val);
        this.list = val ? this.source.filter(v => v.value.indexOf(val) > -1) : [];
      },
    },
  };
</script>

