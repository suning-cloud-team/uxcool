<template>
  <ux-card-advance style="width:250px">
    <img slot="cover"
         src="//image5.suning.cn/uimg/cms/img/153077352410732211.jpg"
         alt="cover">
    <ux-card-meta title="Title"
                  desc="This is Desc">
      <ux-avatar slot="avatar">A</ux-avatar>
    </ux-card-meta>
  </ux-card-advance>
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
