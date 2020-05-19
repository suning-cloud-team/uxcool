<template>
  <div class="demo">
    <h4>tags</h4>
    <ux-select v-model="values"
               :clear-disabled="false"
               :token-separators="[',','.']"
               visible
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

    <h4>tags dataSource</h4>
    <ux-select v-model="values2"
               :clear-disabled="false"
               :data-source="list"
               :lazy="true"
               visible
               option-label-prop="value"
               mode="tags"
               style="width:200px"
               allow-clear
               @change="onChange"
               @select="onSelect"
               @deselect="onDeselect" />
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
        children:
          i % 3 === 0
            ? [{ value: `a${i}${i}` }, { value: `b${i}${i}` }]
            : [{ value: `a${i}${i}` }, { value: `b${i}${i}` }, { value: `c${i}${i}` }],
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
        values: ['A', 'B', 'C'],
        values2: ['C', '2', '1'],
        list: mockData(110),
      };
    },
    created() {
      setTimeout(() => {
        this.isShow = true;
        this.values = ['B', 'C'];
      }, 1500);
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

