<template>
  <ux-select v-model="values"
             :clear-disabled="false"
             :token-separators="[',','.']"
             token-separator-prop="value"
             option-label-prop="label"
             mode="multiple"
             style="width:200px"
             allow-clear
             @change="onChange"
             @select="onSelect"
             @deselect="onDeselect">
    <ux-option value="A"
               label="A1"
               disabled/>
    <ux-option value="B"
               label="B2" />
    <ux-option value="C"
               label="C3" />
  </ux-select>
</template>

<script>
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
        values: ['A', 'B'],
        list: mockData(100),
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
