<template>
  <div class="demo">
    <h4>max tags</h4>
    <ux-select v-model="values"
               :clear-disabled="false"
               max-tag-count="2"
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
    <h4>max tags custom</h4>
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
</template>

<script>
  import { Select } from '@cloud-sn/uxcool';
  // import { SelectLegacy } from '@cloud-sn/uxcool';

  function mockData(cnt) {
    return Array(cnt)
      .fill(0)
      .map((_, i) => ({
        value: i,
        label: `a-${i}`,
      }));
  }
  export default {
    components: {
      UxSelect: Select,
      UxOption: Select.Option,
    },
    data() {
      return {
        isShow: false,
        values: ['A', 'B'],
        values2: ['C', '2', '1'],
        list: mockData(100),
      };
    },
    created() {
      setTimeout(() => {
        this.isShow = true;
      }, 1500);
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

