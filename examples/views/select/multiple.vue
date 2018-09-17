<template>
  <div class="demo">
    <h4>multiple</h4>
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

    <h4>multiple dataSource</h4>
    <ux-select v-model="values2"
               :clear-disabled="false"
               :data-source="list"
               mode="multiple"
               style="width:200px"
               allow-clear
               @change="onChange"
               @select="onSelect"
               @deselect="onDeselect" />
  </div>
</template>

<script>
  import { Select } from '@suning/uxcool';
  // import { SelectLegacy } from '@suning/uxcool';

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
        // values: '',
        values: ['A', 'B'],
        values2: ['C', '2', '1'],
        list: mockData(100),
      };
    },
    created() {
      setTimeout(() => {
        this.isShow = true;
        // this.values = ['B', 'A'];
        this.values = [];
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

