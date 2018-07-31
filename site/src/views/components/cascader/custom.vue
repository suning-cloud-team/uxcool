<template>
  <ux-demo :height="200"
           title="自定义显示">
    <div slot="demo">
      <p>{{ choiceStr }}</p>
      <ux-cascader :data-source="data"
                   @change="onChange">
        <a>trigger</a>
      </ux-cascader>
    </div>
    <div slot="desc">
      自定义切换按钮
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/cascader/custom.vue';

  export default {
    data() {
      return {
        code,
        choiceStr: '',
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
      onChange(_, nodes) {
        this.choiceStr = nodes.map(node => node.label).join(',');
      },
    },
  };
</script>
