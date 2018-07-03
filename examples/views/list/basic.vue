<template>
  <div>
    <normal-demo />
    <!-- <size-demo />
    <grid-demo />
    <grid-responsive-demo />
    <load-more-demo />
    <pagination-demo />
    <async-demo />
    <empty-demo />-->
    <vertical-demo />
    <render-demo />
  </div>
</template>

<script>
  import NormalDemo from './normal.vue';
  import SizeDemo from './size.vue';
  import GridDemo from './grid.vue';
  import GridResponsiveDemo from './grid-responsive.vue';
  import LoadMoreDemo from './loadmore.vue';
  import PaginationDemo from './pagination.vue';
  import AsyncDemo from './async.vue';
  import EmptyDemo from './empty.vue';
  import VerticalDemo from './vertical.vue';
  import RenderDemo from './render.vue';

  export default {
    components: {
      NormalDemo,
      SizeDemo,
      GridDemo,
      GridResponsiveDemo,
      LoadMoreDemo,
      PaginationDemo,
      AsyncDemo,
      EmptyDemo,
      VerticalDemo,
      RenderDemo,
    },
  };
</script>
