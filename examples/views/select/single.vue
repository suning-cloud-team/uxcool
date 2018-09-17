<template>
  <div class="demo">
    <h4>single</h4>
    <ux-select v-model="value"
               :render-group-label="renderGroupLabel"
               option-label-prop="children"
               style="width:200px;"
               allow-clear
               show-search
               @change="onChange"
               @select="onSelect"
               @deselect="onDeselect">
      <span slot="renderLabel"
            slot-scope="{label,value}">
        <ux-icon type="circle_selected" /> {{ label||value }}
      </span>
      <ux-option-group id="1"
                       label="abc">
        <ux-option value="A">A1</ux-option>
        <!-- <ux-option value="A"
                   label="A1" /> -->
        <ux-option value="B"
                   label="B2" />
      </ux-option-group>

      <ux-option id="2"
                 c="1"
                 value="C"
                 label="C3">{{ option2 }}</ux-option>
    </ux-select>
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
      };
    },
    created() {
      setTimeout(() => {
        this.option2 = 'd41';
        this.value = [];
      }, 3500);
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
    },
  };
</script>
