<template>
  <div class="demo">
    <h4>custom attrs</h4>
    <ux-select v-model="value"
               style="width:200px;"
               allow-clear
               show-search
               @change="onChange"
               @select="onSelect"
               @deselect="onDeselect"
               @search="onSearch">
      <ux-option-group id="1"
                       label="abc"
                       title="cccc group"
                       data-a="123">
        <ux-option value="A"
                   title="abc">A1</ux-option>
        <ux-option value="B"
                   label="B2" />
      </ux-option-group>

      <ux-option id="2"
                 c="1"
                 value="C"
                 label="C3">{{ option2 }}</ux-option>
    </ux-select>

    <h4>multiple</h4>
    <ux-select :clear-disabled="false"
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
  import { Select, Icon } from '@cloud-sn/uxcool';

  function mockData(cnt) {
    return Array(cnt)
      .fill(0)
      .map((_, i) => ({
        value: i,
        label: `a-${i}`,
        title: `a-title-${i}`,
    }));
  }
  export default {
    components: {
      UxSelect: Select,
      UxOption: Select.Option,
      UxOptionGroup: Select.Group,
      UxIcon: Icon,
    },
    data() {
      return {
        value: 'A',
        option2: 'c31',
        list: mockData(100),
      };
    },
    methods: {
      onSelect(...args) {
        console.log('onSelect', ...args);
      },
      onDeselect(...args) {
        console.log('onDeselect', ...args);
      },
      onChange(...args) {
        console.log('onChange', ...args);
      },
      onSearch(...args) {
        console.log('onSearch', ...args);
      },
    },
  };
</script>
