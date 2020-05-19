<template>
  <div class="demo">
    <h4>events</h4>
    events: {{ value }}
    <ux-cascader :data-source="data"
                 v-model="value"
                 @change="onChange"
                 @popup-visible-change="onPopupVisibleChange" />
  </div>
</template>

<script>
  import { Cascader } from '@cloud-sn/uxcool';

  export default {
    components: {
      UxCascader: Cascader,
    },
    data() {
      return {
        value: ['zhejiang', 'hangzhou'],
        data: [
          {
            value: 'zhejiang',
            label: 'Zhejiang',
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
    methods: {
      onChange(...args) {
        console.log('onChange', ...args);
      },
      onPopupVisibleChange(visible) {
        console.log('onPopupVisibleChange', visible);
      },
    },
  };
</script>
