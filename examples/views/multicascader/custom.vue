<template>
  <div class="demo">
    <h3>自定义已选标签显示</h3>
    <ux-multi-cascader :value="value"
                       :data-source="dataSource"
                       :display-render="displayRender"
                       style="width: 300px;"
    />
  </div>
</template>

<script>
  import { UxMultiCascader } from '@cloud-sn/uxcool';

  export default {
    components: {
      UxMultiCascader,
    },
    data() {
      return {
        value: [
          ['jiangsu', 'nanjing', 'xuanwu'],
          ['jiangsu', 'nanjing', 'jiangning'],
        ],
        dataSource: [
          {
            value: 'jiangsu',
            label: '江苏',
            children: [
              {
                value: 'nanjing',
                label: '南京',
                children: [
                  {
                    value: 'xuanwu',
                    label: '玄武',
                  },
                  {
                    value: 'gulou',
                    label: '鼓楼',
                  },
                  {
                    value: 'qinhuai',
                    label: '秦淮',
                  },
                  {
                    value: 'jianye',
                    label: '建邺',
                  },
                  {
                    value: 'jiangning',
                    label: '江宁',
                  },
                  {
                    value: 'yuhua',
                    label: '雨花',
                  },
                  {
                    value: 'pukou',
                    label: '浦口',
                  },
                  {
                    value: 'qixia',
                    label: '栖霞',
                  },
                  {
                    value: 'liuhe',
                    label: '六合',
                  },
                  {
                    value: 'lishui',
                    label: '溧水',
                  },
                  {
                    value: 'gaochun',
                    label: '高淳',
                  },
                ],
              },
            ],
          },
          {
            value: 'zhejiang',
            label: '浙江',
            children: [
              {
                value: 'hangzhou',
                label: '杭州',
                children: [
                  {
                    value: 'xihu',
                    label: '西湖',
                  },
                  {
                    value: 'binjiang',
                    label: '滨江',
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
        ],
      };
    },
    methods: {
      displayRender(nodeLabels, nodes) {
        const lastIndex = nodes.length - 1;
        return nodes
          .map((node, i) => (i !== lastIndex ? node.label : `${node.label} (${node.value})`))
          .join(' / ');
      },
    },
  };
</script>
