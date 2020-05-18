<template>
  <div ref="hugeContainerRef"
       class="demo">
    <h4>huge tags</h4>
    <ux-select v-model="values"
               :data-source="list"
               :get-container="getContainer"
               mode="tags"
               style="width:200px"
               allow-clear
               @change="onChange"
               @select="onSelect"
               @deselect="onDeselect" />

    <h4>huge dataSource</h4>
    <ux-select v-model="values2"
               :data-source="list"
               mode="multiple"
               style="width:200px"
               allow-clear
               @change="onChange"
               @select="onSelect"
               @deselect="onDeselect">
      <span slot="extraBottomContent">
        This is extra bottom content
      </span>
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
        list: mockData(5000),
      };
    },
    created() {
      setTimeout(() => {
        this.isShow = true;
      }, 1500);
    },
    methods: {
      getContainer() {
        return this.$refs.hugeContainerRef;
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

