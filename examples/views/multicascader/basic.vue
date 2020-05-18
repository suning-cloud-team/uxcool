<template>
  <div class="demo">
    <h3>基本用法</h3>
    <div>value1: {{ val1 }}</div>
    <div>value2: {{ val2 }}</div>
    <ux-multi-cascader v-model="val1"
                       :data-source="dataSource"
                       style="width:300px; margin-right: 20px"
    />
    <ux-multi-cascader v-model="val2"
                       :data-source="dataSource"
                       placeholder="请勾选地区"
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
        val1: ['foobar'],
        val2: [
          ['foobar'],
          ['jiangsu', 'nanjing', 'xuanwu'],
          ['jiangsu', 'nanjing', 'qinhuai'],
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
                    disabled: true,
                  },
                  {
                    value: 'jianye',
                    label: '建邺',
                  },
                  {
                    value: 'jiangning',
                    label: '江宁',
                    disabled: true,
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
  };
</script>
