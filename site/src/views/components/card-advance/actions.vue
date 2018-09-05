<template>
  <ux-demo :height="200"
           title="完整卡片配置">
    <div slot="demo">
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
    <div slot="desc">
      卡片支持封面, 头像, 标题, 描述信息
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/card-advance/actions.vue';

  export default {
    data() {
      return {
        code,
      };
    },
  };
</script>
