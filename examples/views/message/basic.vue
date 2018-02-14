<template>
  <div>
    <button class="ux-btn"
            @click="changeTheme">{{theme}}</button>
    <div id="msgContainer"></div>
    <div class="demo">
      <h6>basic</h6>
      <button class="ux-btn ux-btn-primary"
              @click="info">basic message</button>
    </div>

    <div class="demo">
      <h6>othder type</h6>
      <button class="ux-btn"
              @click="success">success</button>
      <button class="ux-btn"
              @click="warning">warning</button>
      <button class="ux-btn"
              @click="error">error</button>
    </div>
    <div class="demo">
      <h6>duration = 10s</h6>
      <button class="ux-btn"
              @click="duration">
        duration = 10s
      </button>
    </div>

    <div class="demo">
      <h6>closable</h6>
      <button class="ux-btn"
              @click="vnode">
        closable
      </button>
    </div>
    <div class="demo">
      <h6>html</h6>
      <button class="ux-btn"
              @click="html">
        html
      </button>
    </div>

    <div class="demo">
      <h6>loading</h6>
      <button class="ux-btn"
              @click="loading">
        async loading</button>
    </div>

    <div class="demo">
      <h6>config</h6>
      <button class="ux-btn"
              @click="config">
        config</button>
    </div>

    <div class="demo">
      <h6>detroy all message</h6>
      <button class="ux-btn"
              @click="destroy">
        detroy all message</button>
    </div>
  </div>
</template>


<script>
  import '@suning/uxcool/src/components/message/style/index.scss';
  import UxMessage from '@suning/uxcool/src/components/message';

  export default {
    data() {
      return {
        theme: 'light',
      };
    },
    methods: {
      changeTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        UxMessage.config({ theme: this.theme });
      },
      success() {
        UxMessage.success({
          noticeStyle: {
            color: 'green',
          },
          content: 'This is success message',
          duration: 2500,
          onClose() {
            console.log('success on-close');
          },
        });
      },
      error() {
        UxMessage.error('This is error message');
      },
      warning() {
        UxMessage.warning('This is success message');
      },
      info() {
        UxMessage.info('This is info message');
      },
      duration() {
        UxMessage.success({ content: '10秒后消失', duration: 10000 });
      },
      vnode() {
        const h = this.$createElement;
        UxMessage.info({
          content: h('span', { style: { color: 'red' } }, ['This is closable message!']),
        });
      },
      html() {
        UxMessage.info({
          content: '<span style="color: skyblue">this is html message</span>',
          dangerouslySetInnerHTML: true,
        });
      },
      loading() {
        const destroy = UxMessage.loading({
          content: 'loading...',
          duration: 0,
        });
        setTimeout(destroy, 2500);
      },
      config() {
        UxMessage.config({
          top: '60px',
          duration: 3000,
          getContainer() {
            return document.querySelector('#msgContainer');
          },
        });
      },

      destroy() {
        UxMessage.destroy();
      },
    },
  };
</script>
