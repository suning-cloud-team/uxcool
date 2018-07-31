<template>
  <ux-demo :height="200"
           title="分页">
    <div slot="demo">
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
    <div slot="desc">
      通过
      <code>pagination</code>属性设置分页
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/list/pagination.vue';

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
        code,
        pagination: { position: 'top' },
        descs: mockData(21),
      };
    },
  };
</script>

