<template>

  <div class="demo">
    <h4>color</h4>
    <h6>preset</h6>
    <tag v-for="(color, i) in colors"
         :key="i"
         :theme="theme"
         :color="color">
      {{ color }}
    </tag>

    <h6>custom</h6>
    customColors: {{ customColors }}
    <tag v-for="(color, i) in customColors"
         :key="color"
         :color="color"
         closable
         @close="(e)=>onClose(e,i)">
      {{ color }}
    </tag>
    <ux-button @click="onAdd">add color</ux-button>
  </div>
</template>
<script>
  import { mapState } from 'vuex';
  import { Tag, Button } from '@suning/uxcool';

  let seed = 0;
  export default {
    components: {
      Tag,
      UxButton: Button,
    },
    data() {
      return {
        colors: [
          'pink',
          'magenta',
          'red',
          'volcano',
          'orange',
          'yellow',
          'gold',
          'cyan',
          'lime',
          'green',
          'blue',
          'geekblue',
          'purple',
        ],
        customColors: ['#f50', '#2db7f5', '#87d068', '#108ee9'],
      };
    },
    computed: mapState(['theme']),
    methods: {
      isChecked(tag) {
        return this.checkedTags.indexOf(tag) > -1;
      },
      onChange(checked, tag) {
        const { checkedTags } = this;
        this.checkedTags = checked ? [...checkedTags, tag] : checkedTags.filter(v => v !== tag);
      },
      onClose(e, i) {
        this.customColors.splice(i, 1);
      },
      onAdd() {
        const { colors } = this;
        if (seed < colors.length) {
          this.customColors.push(colors[seed]);
          seed += 1;
        }
      },
    },
  };
</script>
