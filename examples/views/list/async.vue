<template>
  <div class="demo">
    <h4>async</h4>
    <ux-list :data-source="descs"
             :pagination="pagination"
             :loading="isLoading"
             @pagination-change="getData">
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
    </ux-list>
  </div>
</template>


<script>
  import { List, Avatar } from '@suning/uxcool';

  function mockData(cnt = 10, start = 0) {
    return Array(cnt)
      .fill(0)
      .map((_, i) => ({
        title: `title-${start + i}`,
        desc: `description-${start + i}`,
    }));
  }
  export default {
    components: {
      UxList: List,
      UxListItem: List.Item,
      UxListItemMeta: List.Item.Meta,
      UxAvatar: Avatar,
    },
    data() {
      return {
        pagination: {},
        descs: [],
        isLoading: false,
      };
    },
    created() {
      setTimeout(() => {
        // this.pagination = false;
      }, 2500);
      this.getData(1).then(() => {
        this.pagination = { total: 102, current: 1 };
      });
    },
    methods: {
      getData(current, pageSize = 10) {
        this.isLoading = true;
        return new Promise((resolve) => {
          setTimeout(() => {
            this.descs = mockData(pageSize, (current - 1) * pageSize);
            // this.pagination = { ...this.pagination, current: current + 1 };
            this.isLoading = false;
            this.pagination.current = current + 1;
            resolve();
          }, 1500);
        });
      },
    },
  };
</script>
