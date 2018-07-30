<template>
  <ux-demo :height="200"
           title="方法">
    <div slot="demo">
      <ux-button @click="focus">focus</ux-button>
      <ux-button @click="blur">blur</ux-button>
      <br>
      <br>
      <ux-cascader ref="cascaderRef"
                   v-model="value"
                   :data-source="data" />
    </div>
    <div slot="desc">
      <code>focus</code>和
      <code>blur</code>方法设置焦点
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/cascader/focus.vue';

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
