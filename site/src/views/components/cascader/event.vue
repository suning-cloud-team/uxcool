<template>
  <ux-demo :height="200"
           title="事件">
    <div slot="demo">
      <ux-cascader :data-source="data"
                   v-model="value"
                   @change="onChange"
                   @popup-visible-change="onPopupVisibleChange" />
    </div>
    <div slot="desc">
      自定义事件
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/cascader/event.vue';

  export default {
    data() {
      return {
        code,
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
