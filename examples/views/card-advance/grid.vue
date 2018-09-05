<template>
  <div class="demo">
    <h4>Grid</h4>
    <ux-card-advance title="Grid Card">
      <ux-card-grid v-for="(v, i) in 10"
                    :key="i"
                    style="width:25%;text-align:center;">
        grid content
      </ux-card-grid>
    </ux-card-advance>
  </div>
</template>
<script >
  import { Card, Avatar } from '@suning/uxcool';

  export default {
    components: {
      UxCardAdvance: Card,
      UxCardMeta: Card.Meta,
      UxCardGrid: Card.Grid,
      UxAvatar: Avatar,
    },
  };
</script>
