<template>
  <div class="demo">
    <h4>render</h4>
    <h6>slot scope</h6>
    <ux-cascader v-model="value"
                 :data-source="data">
      <span slot="renderLabel"
            slot-scope="{value, label}">
        <span v-if="value === 'shanghai'">
          <span style="color:green">{{ label }}</span>
        </span>
        <span v-else>{{ label }}</span>
      </span>
    </ux-cascader>
    <h6>function</h6>
    <ux-cascader v-model="value"
                 :data-source="data"
                 :render-label="renderLabel" />
  </div>
</template>

<script>
  import { Cascader } from '@suning/uxcool';

  export default {
    components: {
      UxCascader: Cascader,
    },
    data() {
      return {
        value: ['zhejiang', 'hangzhou', 'xihu'],
        data: [
          {
            value: 'zhejiang',
            label: 'Zhejiang',
            children: [
              {
                value: 'hangzhou',
                label: 'Hangzhou',
                disabled: true,
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
      renderLabel({ value, label }) {
        return value === 'jiangsu' ? (
          <span>
            <i class="fu fu-hot_o" />
            <span style="color: red">{label}</span>
          </span>
          ) : (
            label
        );
      },
    },
  };
</script>
