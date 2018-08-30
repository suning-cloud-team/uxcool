<template>
  <div class="demo">
    <h4>custom input</h4>
    value: {{ value }}
    <ux-select v-model="value"
               :render-group-label="renderGroupLabel"
               :get-input-element="getInputElement"
               mode="SECRET_COMBOBOX_MODE_DO_NOT_USE"
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
  import { Select, Icon, Input } from '@suning/uxcool';

  function mockData(cnt) {
    return Array(cnt)
      .fill(0)
      .map((_, i) => ({
        value: i,
        label: `a-${i}`,
        children: [{ value: `a${i}${i}` }, { value: `b${i}${i}` }],
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
        value: '',
        dataSource: mockData(5000),
        option2: 'c31',
      };
    },
    created() {
      setTimeout(() => {
        this.option2 = 'd41';
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
      onTextareInput(...args) {
        console.log('onTextareInput', ...args);
      },
      getInputElement() {
        const { onTextareInput } = this;
        return <Input.Textarea on-input={onTextareInput} />;
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
