<template>
  <div>
    <ux-pagination :current="3"
                   :total="100"
                   show-size-changer
                   @page-size-change="pageSizeChange"
                   @change="change" />
    <br>
    <ux-pagination :current="3"
                   :page-size="20"
                   :total="100"
                   :page-size-options="[20, 40, 60]"
                   :show-before-total="showBeforeTotal"
                   show-size-changer
                   @page-size-change="pageSizeChange"
                   @change="change" />
  </div>
</template>
<script>
  export default {
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
