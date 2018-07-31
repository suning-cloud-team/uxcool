<template>
  <ux-demo :height="200"
           title="hover时展开">
    <div slot="demo">
      <ux-cascader :data-source="data"
                   expand-trigger="hover"
                   change-on-select/>
    </div>
    <div slot="desc">
      hover时展开菜单, 点击时选择菜单
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/cascader/hover.vue';

  export default {
    data() {
      return {
        code,
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

