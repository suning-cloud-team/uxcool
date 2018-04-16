<template>
  <ux-demo title="基本用法"
           :height="200">
    <div slot="demo">
      <ux-popconfirm title="Are you sure delete this task?">
        Delete
      </ux-popconfirm>
    </div>
    <div slot="desc">
      简单用法
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/popconfirm/basic.vue';

  export default {
    data() {
      return {
        code,
      };
    },
  };
</script>
