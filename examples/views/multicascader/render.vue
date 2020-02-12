<template>
  <div class="demo">
    <h3>自定义节点内容</h3>
    <ux-multi-cascader
      :value="value"
      :data-source="dataSource"
      :render-label="renderLabel"
      style="width: 300px; margin-right: 20px;"
    />
    <ux-multi-cascader :value="value"
                       :data-source="dataSource"
                       style="width: 300px;"
    >
      <template slot="renderLabel"
                slot-scope="{ value: val, label }"
      >
        <span v-if="val === 'jiangsu'"
              style="color: green"
        >{{ label }}</span>
        <span v-else>{{ label }}</span>
      </template>
    </ux-multi-cascader>
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
        value: [],
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
      renderLabel({ value, label }) {
        return value === 'jiangsu' ? <span style="color: green">{label}</span> : label;
      },
    },
  };
</script>
