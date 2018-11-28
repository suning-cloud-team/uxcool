<template>
  <div>
    <div ref="wrapRef"
         class="demo">
      <h4>popup container</h4>
      <popconfirm :get-popup-container="getPopupContainer"
                  placement="bottomRight"
                  title="Are you sure delete this task?">
        Delete
      </popconfirm>
    </div>
  </div>
</template>


<script>
  import { Popconfirm } from '@suning/uxcool';

  export default {
    components: {
      Popconfirm,
    },
    methods: {
      getPopupContainer() {
        return this.$refs.wrapRef;
      },
    },
  };
</script>
