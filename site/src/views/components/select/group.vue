<template>
  <ux-demo :height="200"
           title="分组">
    <div slot="demo">
      <ux-select :render-group-label="renderGroupLabel"
                 option-label-prop="children"
                 style="width:200px;"
                 allow-clear
                 show-search
                 value=""
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
    <div slot="desc">
      分组
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/select/group.vue';

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
    data() {
      return {
        code,
        dataSource: mockData(500),
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
            <ux-icon type="play_pause_o" />
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
