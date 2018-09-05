<template>
  <div class="demo">
    <h4>Actions</h4>
    <ux-card-advance style="width:250px">
      <img slot="cover"
           src="//image5.suning.cn/uimg/cms/img/153077352410732211.jpg"
           alt="cover">
      <ux-card-meta title="Title"
                    desc="This is Desc">
        <ux-avatar slot="avatar">A</ux-avatar>
      </ux-card-meta>
      <ux-icon slot="actions"
               type="setting" />
      <ux-icon slot="actions"
               type="edit" />
      <ux-icon slot="actions"
               type="more" />
    </ux-card-advance>
  </div>
</template>
<script >
  import { Card, Avatar, Icon } from '@suning/uxcool';

  export default {
    components: {
      UxCardAdvance: Card,
      UxCardMeta: Card.Meta,
      UxAvatar: Avatar,
      UxIcon: Icon,
    },
  };
</script>
