<template>
  <ux-demo title="热门标签"
           vertical>
    <div slot="demo">
      LIST:
      <ux-checkable-tag v-for="(tag,i) in tags"
                        :key="i"
                        :checked="isChecked(tag)"
                        :theme="theme"
                        @change="onChange($event,tag)">
        {{ tag }}
      </ux-checkable-tag>
    </div>
    <div slot="desc">受控组件, 需用户自己维护状态</div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/tag/checkable.vue';

  export default {
    data() {
      return {
        code,
        tags: ['Movies', 'Books', 'Music', 'Sports'],
        checkedTags: ['Books'],
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
