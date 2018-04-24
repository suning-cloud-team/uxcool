<template>

  <div class="demo">
    <h6>checkableTag</h6>
    <p>受控组件, 需用户自己维护状态</p>
    LIST:
    <checkable-tag v-for="(tag,i) in tags"
                   :key="i"
                   :theme="theme"
                   :checked="isChecked(tag)"
                   @change="onChange($event,tag)">
      {{ tag }}
    </checkable-tag>
  </div>
</template>
<script>
  import { mapState } from 'vuex';
  import { Tag } from '@suning/uxcool';

  export default {
    components: {
      CheckableTag: Tag.CheckableTag,
    },
    data() {
      return {
        tags: ['Movies', 'Books', 'Music', 'Sports'],
        checkedTags: ['Books'],
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
    },
  };
</script>
