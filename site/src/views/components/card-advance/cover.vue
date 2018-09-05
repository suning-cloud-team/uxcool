<template>
  <ux-demo :height="200"
           title="灵活内容卡片">
    <div slot="demo">
      <ux-card-advance style="width:250px">
        <img slot="cover"
             src="//image5.suning.cn/uimg/cms/img/153077352410732211.jpg"
             alt="cover">
        <ux-card-meta title="Title"
                      desc="This is Desc">
          <ux-avatar slot="avatar">A</ux-avatar>
        </ux-card-meta>
      </ux-card-advance>
    </div>
    <div slot="desc">
      使用
      <code>ux-card-meta</code>
      展示更丰富内容
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/card-advance/cover.vue';

  export default {
    data() {
      return {
        code,
      };
    },
  };
</script>
