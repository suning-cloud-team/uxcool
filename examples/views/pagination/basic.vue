<template>
  <div>
    <div class="demo">
      <ux-pagination :total="50" />
    </div>
    <div class="demo">
      <ux-pagination :current="5"
                     :total="500" />
    </div>

    <div class="demo">
      <ux-pagination show-quick-jumper
                     :current="5"
                     :total="500" />
    </div>

    <div class="demo">
      <ux-pagination simple
                     :total="500"
                     @change="paginationChange" />
    </div>

    <div class="demo">
      <ux-pagination :total="500"
                     :show-before-total="showBeforeTotal"
                     @change="paginationChange" />
    </div>

    <div class="demo">
      <ux-pagination :current="current"
                     :total="500"
                     :show-before-total="showBeforeTotal"
                     @change="paginationChange" />

    </div>

    <div class="demo">
      <ux-pagination :current="current"
                     :total="500"
                     theme="dark"
                     show-quick-jumper-confirm-btn
                     show-quick-jumper
                     :show-before-total="showBeforeTotal"
                     @change="paginationChange" />
      <ux-pagination :current="1"
                     :total="0"
                     :show-before-total="showBeforeTotal"
                     @change="paginationChange" />
    </div>

    <div class="demo">
      <ux-pagination :total="total" />
    </div>

    <stream-demo />
  </div>
</template>


<script>
  import { Pagination } from '@suning/uxcool';
  import Stream from './stream.vue';

  export default {
    components: {
      UxPagination: Pagination,
      StreamDemo: Stream,
    },
    data() {
      return {
        current: 6,
        total: 0,
      };
    },
    created() {
      setTimeout(() => {
        this.total = 1;
      }, 1500);
    },
    methods: {
      paginationChange(p) {
        console.log(p);
        this.current = p;
      },
      showBeforeTotal(total, pageSize, totalPage, pageNo, range) {
        return `共${total}条, 每页显示${pageSize}条, ${range[0]}-${
          range[1]
        } / ${total}条, 共${pageNo}/${totalPage}页`;
      },
    },
  };
</script>
