<template>
  <div class="demo">
    <h4>normal</h4>
    <ux-cascader v-model="value"
                 :data-source="data"
                 popup-placement="bottomRight" />
  </div>
</template>

<script>
  import { Cascader } from '@suning/uxcool';

  const defaultData = [
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
  ];
  export default {
    components: {
      UxCascader: Cascader,
    },
    data() {
      return {
        value: [],
        // value: ['zhejiang', 'hangzhou', 'xihu'],
        data: [],
      };
    },
    created() {
      setTimeout(() => {
        this.value.push('jiangsu');
      }, 1500);
      setTimeout(() => {
        this.data = [...defaultData];
      }, 2000);
    },
  };
</script>
