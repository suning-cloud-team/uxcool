<template>
  <div>
    <div class="demo">
      <ux-pagination :total="50"> </ux-pagination>
    </div>
    <div class="demo">
      <ux-pagination :current="5"
                     :total="500"></ux-pagination>
    </div>

    <div class="demo">
      <ux-pagination show-quick-jumper
                     :current="5"
                     :total="500"></ux-pagination>
    </div>

    <div class="demo">
      <ux-pagination simple
                     :total="500"
                     @change="paginationChange">
      </ux-pagination>
    </div>

    <div class="demo">
      <ux-pagination :total="500"
                     :show-before-total="showBeforeTotal"
                     @change="paginationChange">
      </ux-pagination>
    </div>

    <div class="demo">
      <ux-pagination :current="current"
                     :total="500"
                     :show-before-total="showBeforeTotal"
                     @change="paginationChange">
      </ux-pagination>

    </div>

    <div class="demo">
      <ux-pagination :current="current"
                     :total="500"
                     theme="dark"
                     show-quick-jumper-confirm-btn
                     show-quick-jumper
                     :show-before-total="showBeforeTotal"
                     @change="paginationChange">
      </ux-pagination>

    </div>
  </div>
</template>


<script>
  import '@suning/uxcool/src/components/pagination/style/index.scss';
  import UxPagination from '@suning/uxcool/src/components/pagination';

  export default {
    data() {
      return {
        current: 6,
      };
    },
    methods: {
      paginationChange(p) {
        console.log(p);
        this.current = p;
      },
      showBeforeTotal(total, pageSize, totalPage, pageNo, range) {
        return `共${total}条, 每页显示${pageSize}条, ${range[0]}-${range[1]} / ${total}条, 共${totalPage}页`;
      },
    },
    components: {
      UxPagination,
    },
  };
</script>
