<template>
  <div class="demo">
    <h4>pagination</h4>
    <ux-list :data-source="descs"
             :pagination="pagination">
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
  function mockData(cnt = 10) {
    return Array(cnt)
      .fill(0)
      .map((_, i) => ({
        title: `title-${i}`,
        desc: `description-${i}`,
    }));
  }
  export default {
    data() {
      return {
        pagination: { position: 'top' },
        descs: mockData(21),
      };
    },
    created() {
      setTimeout(() => {
        // this.pagination = false;
      }, 2500);
    },
  };
</script>
