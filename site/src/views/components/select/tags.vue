<template>
  <ux-demo :height="200"
           title="标签">
    <div slot="demo">
      <ux-select v-model="values"
                 :clear-disabled="false"
                 :token-separators="[',','.']"
                 option-label-prop="value"
                 mode="tags"
                 style="width:200px"
                 allow-clear
                 @change="onChange"
                 @select="onSelect"
                 @deselect="onDeselect">
        <ux-option value="A"
                   label="A1"
                   disabled />
        <ux-option value="B"
                   label="B2" />
        <ux-option value="C"
                   label="C3" />
      </ux-select>
    </div>
    <div slot="desc">
      任意输入内容, 自定变成 标签
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/select/tags.vue';

  function mockData(cnt) {
    return Array(cnt)
      .fill(0)
      .map((_, i) => ({
        value: i,
        label: `a-${i}`,
        children:
          i % 3 === 0
            ? [{ value: `a${i}${i}` }, { value: `b${i}${i}` }]
            : [{ value: `a${i}${i}` }, { value: `b${i}${i}` }, { value: `c${i}${i}` }],
    }));
  }
  export default {
    data() {
      return {
        code,
        values: ['A', 'B', 'C'],
        list: mockData(110),
      };
    },
    methods: {
      onDeselect(...args) {
        console.log('onDeselect', ...args);
      },
      onSelect(...args) {
        console.log('onSelect', ...args);
      },
      onChange(...args) {
        console.log('onChange', ...args);
      },
    },
  };
</script>
