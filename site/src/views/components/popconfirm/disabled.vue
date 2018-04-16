<template>
  <ux-demo title="不可用"
           :height="200">
    <div slot="demo">
      <ux-popconfirm disabled
                     title="Are you sure delete this task?">
        Delete
      </ux-popconfirm>
    </div>
    <div slot="desc">
      设置
      <code>disabled</code>参数,使
      <code>popconfirm</code>不可用
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/popconfirm/disabled.vue';

  export default {
    data() {
      return {
        code,
      };
    },
  };
</script>
