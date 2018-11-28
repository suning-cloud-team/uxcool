<template>
  <div ref="wrapRef"
       class="demo">
    <h4>popupContainer </h4>
    <ux-popover :popover-style="{width:'200px'}"
                :get-popup-container="getPopupContainer"
                content="自定义标题">
      自定义标题内容
      <span slot="title"
            style="color:red">标题红</span>
      <template slot="content">
        <span style="color:green">这是内容这是内容这是内容这是内容这是内容这是内容这是内容</span>
        <div>额外内容</div>
      </template>
    </ux-popover>
  </div>

</template>

<script>
  import { Popover } from '@suning/uxcool';

  export default {
    components: {
      UxPopover: Popover,
    },
    methods: {
      getPopupContainer() {
        return this.$refs.wrapRef;
      },
    },
  };
</script>
