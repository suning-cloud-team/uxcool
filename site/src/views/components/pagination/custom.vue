<template>
  <ux-demo title="自定义文案">
    <ux-pagination slot="demo"
                   :total="500"
                   :theme="theme"
                   :show-before-total="showBeforeTotal"
                   @change="paginationChange">
    </ux-pagination>
    </ux-pagination>
    <div slot="desc">通过自定义
      <code>show-before-total</code>属性函数,设置分页文案</div>
    <ux-code slot="code">
      {{code}}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/pagination/custom';

  export default {
    data() {
      return {
        code,
        current: 5,
      };
    },
    computed: {
      theme() {
        return this.$store.state.theme;
      },
    },
    methods: {
      paginationChange(p) {
        console.log(p);
        this.current = p;
      },
      showBeforeTotal(total, pageSize, totalPage, pageNo, range) {
        return `共${total}条, 每页显示${pageSize}条, ${range[0]}-${range[1]} / ${total}条, 共${
          totalPage
        }页`;
      },
    },
  };
</script>
