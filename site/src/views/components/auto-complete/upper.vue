<template>
  <ux-demo :height="200"
           title="不区分大小写">
    <div slot="demo">
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
    <div slot="desc">
      不区分大小写
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/auto-complete/upper.vue';

  export default {
    data() {
      return {
        code,
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

