<template>
  <ux-demo title="多彩标签"
           vertical>
    <div slot="demo">
      <h6>preset</h6>
      <ux-tag v-for="(color, i) in colors"
              :key="i"
              :theme="theme"
              :color="color">
        {{ color }}
      </ux-tag>

      <h6>custom</h6>
      <div>
        <ux-tag v-for="(color, i) in customColors"
                :key="i"
                :theme="theme"
                :color="color"
                closable>
          {{ color }}
        </ux-tag>
      </div>

    </div>
    <div slot="desc">标签可设置为各种颜色</div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>
<script>
  import code from '@/code/tag/color.vue';

  export default {
    data() {
      return {
        code,
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
    computed: {
      theme() {
        return this.$store.state.theme;
      },
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
