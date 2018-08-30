<template>
  <ux-demo :height="200"
           title="禁用">
    <div slot="demo">
      <ux-auto-complete :data-source="dataSource"
                        disabled
                        @search="onSearch">
        <ux-textarea slot="renderInputElement"
                     :auto-size="{minRows: 3}"
                     style="height:50px" />
      </ux-auto-complete>
    </div>
    <div slot="desc">
      禁用
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/auto-complete/disabled.vue';

  export default {
    data() {
      return {
        code,
        dataSource: [],
      };
    },
    methods: {
      onSearch(searchValue) {
        this.dataSource = searchValue
          ? [1, 2, 3].map(v => ({
            value: `${searchValue}`.repeat(v),
          }))
          : [];
      },
    },
  };
</script>
