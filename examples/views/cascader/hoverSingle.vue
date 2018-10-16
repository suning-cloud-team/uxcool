<template>
  <div class="demo">
    <h4>hover single</h4>
    <ux-cascader v-model="value"
                 :data-source="data"
                 change-on-select
                 expand-trigger="hover" />
  </div>
</template>

<script>
  import { Cascader } from '@suning/uxcool';

  export default {
    components: {
      UxCascader: Cascader,
    },
    data() {
      return {
        value: ['zhejiang', 'hangzhou', 'xihu'],
        data: [
          {
            value: 'zhejiang',
            label: 'Zhejiang',
            children: [
              {
                value: 'hangzhou',
                label: 'Hangzhou',
                disabled: true,
                children: [
                  {
                    value: 'xihu',
                    label: 'West Lake',
                  },
                ],
              },
            ],
          },
          {
            value: '新疆',
            label: '新疆',
          },
          {
            value: 'shanghai',
            label: '上海',
            children: [
              {
                value: 'shanghai',
                label: '上海',
              },
            ],
          },
          {
            value: 'jiangsu',
            label: 'Jiangsu',
            children: [
              {
                value: 'nanjing',
                label: 'Nanjing',
                children: [
                  {
                    value: 'zhonghuamen',
                    label: 'Zhong Hua Men',
                  },
                ],
              },
            ],
          },
        ],
      };
    },
  };
</script>
