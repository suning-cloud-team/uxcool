<template>
  <ux-demo :height="200"
           title="自定义Option">
    <div slot="demo">
      <ux-auto-complete v-model="value"
                        @search="onSearch"
                        @change="onChange">
        <ux-option v-for="(option,i) in dataSource"
                   :key="i"
                   :value="option">
          {{ option }}
        </ux-option>
      </ux-auto-complete>
    </div>
    <div slot="desc">
      自定义
      <code>option</code>,而非使用
      <code>data-source</code>
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/auto-complete/option.vue';

  export default {
    data() {
      return {
        code,
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

