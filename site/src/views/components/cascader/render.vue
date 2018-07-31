<template>
  <ux-demo :height="200"
           title="">
    <div slot="demo">
      <h4>slot方式渲染</h4>
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
      <h4>函数方式渲染</h4>
      <ux-cascader v-model="value"
                   :data-source="data"
                   :render-label="renderLabel" />
    </div>
    <div slot="desc">
      自定义渲染方式
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/cascader/render.vue';

  export default {
    data() {
      return {
        code,
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
