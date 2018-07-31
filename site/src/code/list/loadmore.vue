<template>
  <ux-list :data-source="descs">
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
    <div slot="loadMore"
         style="margin:20px 0; text-align:center;">
      <ux-button v-if="!isLoaded"
                 :loading="isLoading"
                 @click="loadMore"
                 @keydown="keydown">
        loadMore
      </ux-button>
      <span v-else
            style="color: #ccc">
        这是底线!
      </span>
    </div>
  </ux-list>
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
        descs: mockData(),
        isLoading: false,
        isLoaded: false,
      };
    },
    methods: {
      loadMore() {
        this.isLoading = true;
        console.log('load-more');
        setTimeout(() => {
          const data = mockData();
          this.descs.push(...data);
          this.isLoading = false;
          if (this.descs.length > 25) {
            this.isLoaded = true;
          }
        }, 2500);
      },
      keydown() {
        console.log('keydown');
      },
    },
  };
</script>

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
        descs: mockData(),
        isLoading: false,
        isLoaded: false,
      };
    },
    methods: {
      loadMore() {
        this.isLoading = true;
        console.log('load-more');
        setTimeout(() => {
          const data = mockData();
          this.descs.push(...data);
          this.isLoading = false;
          if (this.descs.length > 25) {
            this.isLoaded = true;
          }
        }, 2500);
      },
      keydown() {
        console.log('keydown');
      },
    },
  };
</script>
