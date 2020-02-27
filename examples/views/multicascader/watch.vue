<template>
  <div class="demo">
    <h3>数据源变化</h3>
    <ux-button @click="changeDS(1)">
      change ds1
    </ux-button>
    <ux-button @click="changeDS(2)">
      change ds2
    </ux-button>
    <ux-button @click="changeVal(1)">
      change val1
    </ux-button>
    <ux-button @click="changeVal(2)">
      change val2
    </ux-button>
    <br>
    <ux-multi-cascader v-model="value"
                       :data-source="dataSource"
                       style="width:300px;"
    />
    <div>value: {{ value }}</div>
  </div>
</template>

<script>
  import { UxMultiCascader, UxButton } from '@suning/uxcool';

  const ds1 = [
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
      value: 'beijing',
      label: '北京',
    },
    {
      value: 'zhejiang',
      label: '浙江',
      children: [
        {
          value: 'hangzhou',
          label: '杭州',
        },
      ],
    },
  ];

  const ds2 = [
    {
      value: '1',
      label: '1',
    },
    {
      value: '2',
      label: '2',
    },
  ];

  const val1 = [['jiangsu', 'nanjing', 'gaochun']];
  const val2 = [['1']];

  export default {
    components: {
      UxMultiCascader,
      UxButton,
    },
    data() {
      return {
        value: [['foobar'], ['jiangsu', 'nanjing']],
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
      changeDS(n) {
        this.dataSource = n === 1 ? ds1 : ds2;
      },
      changeVal(n) {
        this.value = n === 1 ? val1 : val2;
      },
    },
  };
</script>
