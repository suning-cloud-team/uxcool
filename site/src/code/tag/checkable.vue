<template>
  <div>
    LIST:
    <ux-checkable-tag v-for="(tag,i) in tags"
                      :key="i"
                      :checked="isChecked(tag)"
                      @change="onChange($event,tag)">
      {{ tag }}
    </ux-checkable-tag>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tags: ['Movies', 'Books', 'Music', 'Sports'],
        checkedTags: ['Books'],
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
