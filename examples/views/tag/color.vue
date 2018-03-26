<template>

  <div class="demo">
    <h4>color</h4>
    <h6>preset</h6>
    <tag v-for="(color, i) in colors"
         :key="i"
         :color="color">
      {{ color }}
    </tag>

    <h6>custom</h6>
    <tag v-for="(color, i) in customColors"
         :key="i"
         :color="color"
         closable>
      {{ color }}
    </tag>
  </div>
</template>
<script>
  import { Tag } from '@suning/uxcool';

  export default {
    components: {
      Tag,
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
    methods: {
      isChecked(tag) {
        return this.checkedTags.indexOf(tag) > -1;
      },
      onChange(checked, tag) {
        const { checkedTags } = this;
        this.checkedTags = checked ? [...checkedTags, tag] : checkedTags.filter(v => v !== tag);
      },
    },
  };
</script>
