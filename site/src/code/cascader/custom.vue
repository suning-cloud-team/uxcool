<template>
  <div>
    <p>{{ choiceStr }}</p>
    <ux-cascader :data-source="data"
                 @change="onChange">
      <a>trigger</a>
    </ux-cascader>
  </div>
</template>

<script>
  export default {
    data() {
      return {
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
