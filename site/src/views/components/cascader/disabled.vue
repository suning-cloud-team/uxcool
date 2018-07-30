<template>
  <ux-demo :height="200"
           title="禁用">
    <div slot="demo">
      <ux-cascader :data-source="data"
                   disabled />
    </div>
    <div slot="desc">
      可以通过
      <code>disabled</code>属性禁用组件,或通过
      <code>data</code>中的
      <code>disabled</code>设置成员禁用
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/cascader/disabled.vue';

  export default {
    data() {
      return {
        code,
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
            disabled: true,
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
