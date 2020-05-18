<template>
  <div class="demo">
    <h4>Stream</h4>
    <ux-pagination :total="total"
                   mode="stream" />
  </div>
</template>


<script>
  import { Pagination } from '@cloud-sn/uxcool';

  export default {
    components: {
      UxPagination: Pagination,
    },
    data() {
      return {
        total: 100,
      };
    },
    created() {
      setTimeout(() => {
        this.total = 250;
      }, 1500);
    },
  };
</script>
