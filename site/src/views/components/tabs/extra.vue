<template>
  <ux-demo title="额外内容"
           vertical>
    <div slot="demo">
      <ux-tabs>
        <ux-tab-pane tab="Tab 1"
                     name="1">
          Tab 1 Content
        </ux-tab-pane>
        <ux-tab-pane tab="Tab 2"
                     name="2">
          Tab 2 Content
        </ux-tab-pane>
        <ux-tab-pane tab="Tab 3"
                     name="3">
          Tab 3 Content
        </ux-tab-pane>
        <ux-button slot="tabBarExtraContent">额外内容</ux-button>
      </ux-tabs>
    </div>
    <div slot="desc">使用<code>tabBarExtraContent</code>slot往页签添加额外内容</div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/tabs/extra.vue';

  export default {
    data() {
      return {
        code,
      };
    },
  };
</script>
