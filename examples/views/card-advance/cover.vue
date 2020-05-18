<template>
  <div class="demo">
    <h4>Cover</h4>
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
</template>
<script >
  import { Card, Avatar } from '@cloud-sn/uxcool';

  export default {
    components: {
      UxCardAdvance: Card,
      UxCardMeta: Card.Meta,
      UxAvatar: Avatar,
    },
  };
</script>
