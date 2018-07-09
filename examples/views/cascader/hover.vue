<template>
  <div class="demo">
    <h4>hover trigger</h4>
    <ux-cascader :data-source="data"
                 expand-trigger="hover"
                 change-on-select/>
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
        data: [
          {
            value: 'zhejiang',
            label: 'Zhejiang',
            disabled: true,
            children: [
              {
                value: 'hangzhou',
                label: 'Hangzhou',
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
