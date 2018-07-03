<template>
  <div class="demo">
    <h4>empty</h4>
    <ux-list :data-source="descs">
      <span slot="header">This is header</span>
      <span slot="footer">This is footer</span>
      <template slot="renderItem"
                slot-scope="{item}">
        <ux-list-item>
          <span slot="actions">edit</span>
          <span slot="actions">more</span>
          <ux-list-item-meta>
            <ux-avatar slot="avatar">A</ux-avatar>
            <span slot="title">{{ item.title }}</span>
            <span slot="desc">{{ item.desc }}</span>
          </ux-list-item-meta>
        </ux-list-item>
      </template>

      <span slot="emptyText"
            style="color: red">No Data</span>
    </ux-list>

  </div>
</template>


<script>
  import { List, Avatar } from '@suning/uxcool';

  export default {
    components: {
      UxList: List,
      UxListItem: List.Item,
      UxListItemMeta: List.Item.Meta,
      UxAvatar: Avatar,
    },
    data() {
      return {
        descs: [{ title: 'title', desc: 'desc' }, { title: 'title', desc: 'desc' }],
      };
    },
    created() {
      setTimeout(() => {
        // this.pagination = false;
      }, 2500);
    },
  };
</script>
