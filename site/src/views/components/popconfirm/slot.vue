<template>
  <ux-demo title="自定义内容"
           :height="200">
    <div slot="demo">
      <ux-popconfirm>
        Delete
        <div style="color: red"
             slot="title">
          <div>

            This is title?
          </div>
          <div>this is description</div>
        </div>
      </ux-popconfirm>
    </div>
    <div slot="desc">
      通过
      <code>slot="title"</code>,自定义
      <code>popconfirm</code>内容
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/popconfirm/slot.vue';

  export default {
    data() {
      return {
        code,
      };
    },
  };
</script>
