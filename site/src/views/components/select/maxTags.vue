<template>
  <ux-demo :height="200"
           title="自定义Tags显示">
    <div slot="demo">
      <ux-select v-model="values"
                 :clear-disabled="false"
                 :max-tag-placeholder="maxTagPlaceholder"
                 max-tag-count="0"
                 mode="multiple"
                 style="width:200px"
                 allow-clear
                 @change="onChange"
                 @select="onSelect"
                 @deselect="onDeselect">
        <ux-option value="A"
                   label="A1" />
        <ux-option value="B"
                   label="B2" />
        <ux-option value="C"
                   label="C3" />
      </ux-select>
    </div>
    <div slot="desc">
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/select/maxTags.vue';

  function mockData(cnt) {
    return Array(cnt)
      .fill(0)
      .map((_, i) => ({
        value: i,
        label: `a-${i}`,
    }));
  }
  export default {
    data() {
      return {
        code,
        values: ['A', 'B'],
        list: mockData(100),
      };
    },
    methods: {
      maxTagPlaceholder(nodes) {
        return <span style="color:green">选择了{nodes.length}节点</span>;
      },
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
