<template>
  <ux-demo title="配置"
           :height="200">
    <div slot="demo"
         class="gutter-group">
      <ux-button @click="setConfig">set config top=5, </ux-button>
      <ux-button @click="setConfig2">set config placement=bottomLeft, </ux-button>
      <ux-button @click="setConfig3">
        set config placement=bottomRight, getContainer= noticeWrapRef
      </ux-button>
      <br>
      <ux-button @click="open">open global config notification</ux-button>

      <div ref="noticeWrapRef" />
    </div>
    <div slot="desc">点击上面一排设置全局配置后再点击下面弹出按钮，查看有什么不同。
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import { UxNotification } from '@suning/uxcool';
  import code from '@/code/notification/config.vue';

  export default {
    data() {
      return {
        code,
      };
    },
    methods: {
      setConfig() {
        UxNotification.config({
          top: 5,
        });
      },
      setConfig2() {
        UxNotification.config({
          placement: 'bottomLeft',
        });
      },
      setConfig3() {
        const { $refs } = this;
        UxNotification.config({
          placement: 'bottomRight',
          getContainer() {
            return $refs.noticeWrapRef;
          },
        });
      },
      open() {
        UxNotification.open({
          title: 'notification',
          description: 'this is description',
        });
      },
    },
  };
</script>

