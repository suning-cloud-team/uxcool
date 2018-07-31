<template>
  <div>
    <ux-button @click="focus">focus</ux-button>
    <ux-button @click="blur">blur</ux-button>
    <br>
    <br>
    <ux-cascader ref="cascaderRef"
                 v-model="value"
                 :data-source="data" />
  </div>
</template>

<script>
  export default {
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
      focus() {
        const { $refs: { cascaderRef } } = this;
        if (cascaderRef) {
          cascaderRef.focus();
        }
      },
      blur() {
        const { $refs: { cascaderRef } } = this;
        if (cascaderRef) {
          cascaderRef.blur();
        }
      },
    },
  };
</script>
