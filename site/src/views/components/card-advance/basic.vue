<template>
  <ux-demo :height="200"
           title="基本卡片">
    <div slot="demo">
      <ux-card-advance title="card title"
                       hoverable>
        <a slot="extra">More</a>
        <p>content</p>
        <p>content</p>
        <p>content</p>
      </ux-card-advance>
    </div>
    <div slot="desc">
      基本卡片,包含标题,内容,操作区域
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/card-advance/basic.vue';

  export default {
    data() {
      return {
        code,
      };
    },
  };
</script>

