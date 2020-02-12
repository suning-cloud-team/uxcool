<template>
  <div class="demo">
    <h3>自定义字段名</h3>
    <ux-multi-cascader :value="value"
                       :data-source="dataSource"
                       :field-names="fieldNames"
                       style="width: 300px;"
    />
  </div>
</template>

<script>
  import { UxMultiCascader } from '@suning/uxcool';

  export default {
    components: {
      UxMultiCascader,
    },
    data() {
      return {
        value: [['jiangsu', 'nanjing', 'xuanwu']],
        fieldNames: {
          value: 'code',
          label: 'name',
          children: 'items',
        },
        dataSource: [
          {
            code: 'jiangsu',
            name: '江苏',
            items: [
              {
                code: 'nanjing',
                name: '南京',
                items: [
                  {
                    code: 'xuanwu',
                    name: '玄武',
                  },
                  {
                    code: 'gulou',
                    name: '鼓楼',
                  },
                  {
                    code: 'qinhuai',
                    name: '秦淮',
                  },
                  {
                    code: 'jianye',
                    name: '建邺',
                  },
                  {
                    code: 'jiangning',
                    name: '江宁',
                  },
                  {
                    code: 'yuhua',
                    name: '雨花',
                  },
                  {
                    code: 'pukou',
                    name: '浦口',
                  },
                  {
                    code: 'qixia',
                    name: '栖霞',
                  },
                  {
                    code: 'liuhe',
                    name: '六合',
                  },
                  {
                    code: 'lishui',
                    name: '溧水',
                  },
                  {
                    code: 'gaochun',
                    name: '高淳',
                  },
                ],
              },
            ],
          },
          {
            code: 'zhejiang',
            name: '浙江',
            items: [
              {
                code: 'hangzhou',
                name: '杭州',
                items: [
                  {
                    code: 'xihu',
                    name: '西湖',
                  },
                  {
                    code: 'binjiang',
                    name: '滨江',
                  },
                ],
              },
            ],
          },
          {
            code: 'shanghai',
            name: '上海',
            items: [
              {
                code: 'shanghai',
                name: '上海',
              },
            ],
          },
        ],
      };
    },
  };
</script>
