<template>
  <div class="demo">
    <h4>search</h4>
    <ux-select v-model="value"
               :data-source="data"
               style="width:200px"
               show-search
               @change="onChange"
               @deselect="onDeselect"
               @search="onSearch" />
    <h4> multiple search</h4>
    <ux-select v-model="value"
               :data-source="data"
               mode="multiple"
               style="width:200px"
               show-search
               @change="onChange"
               @deselect="onDeselect"
               @search="onSearch" />
  </div>
</template>

<script>
  import { Select, Icon } from '@suning/uxcool';

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
        data: [
          {
            value: 1,
            label: 'label-1',
          },
          {
            value: 2,
            label: 'label-2',
          },
        ],
      };
    },
    created() {
      // setTimeout(() => {
      //   this.option2 = 'd41';
      //   this.value = [];
      // }, 3500);
    },
    methods: {
      renderGroupLabel(option) {
        return (
          <span>
            <Icon type="play_pause_o" />
            {option.label}
          </span>
        );
      },
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
        const key = new Date().getTime();
        this.data = [
          {
            value: `${key}-3`,
            label: `${key}-label-3`,
          },
          {
            value: `${key}-4`,
            label: `${key}-label-4`,
          },
        ];
        console.log('onSearch', ...args);
      },
    },
  };
</script>
