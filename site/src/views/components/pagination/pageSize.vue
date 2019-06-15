<template>
  <ux-demo title="页码大小">
    <div slot="demo">
      <ux-pagination :theme="theme"
                     :current="3"
                     :total="100"
                     show-size-changer
                     @page-size-change="pageSizeChange"
                     @change="change" />
      <br>
      <ux-pagination :theme="theme"
                     :current="3"
                     :page-size="20"
                     :total="100"
                     :page-size-options="[20, 40, 60]"
                     :show-before-total="showBeforeTotal"
                     show-size-changer
                     @page-size-change="pageSizeChange"
                     @change="change" />
    </div>
    <div slot="desc">通过<code>show-size-changer</code>设置是否显示页码大小下拉框, 通过<code>page-size-options</code>传入页码大小可选值。</div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>
<script>
  import code from '@/code/pagination/pageSize.vue';

  export default {
    data() {
      return {
        code,
      };
    },
    computed: {
      theme() {
        return this.$store.state.theme;
      },
    },
    methods: {
      showBeforeTotal(total) {
        return `共${total}条记录`;
      },
      pageSizeChange(current, size) {
        console.log('pageSize change', current, size);
      },
      change(current, size) {
        console.log('change', current, size);
      },
    },
  };
</script>
