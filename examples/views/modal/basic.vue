<template>
  <div>
    <button class="ux-btn"
            @click="changeTheme">{{theme}}</button>
    <div class="demo">
      <h6>basic</h6>
      <button class="ux-btn"
              @click="baiscOpen">Open</button>
      <ux-modal v-model="basicVisible"
                :theme="theme"
                title="Basic"
                @ok="onOk($event, 'basic')"
                @cancel="onCancel($event, 'basic')"
                @close="onClose"
                @after-close="onAfterClose">
        <p>contents</p>
        <p>contents</p>
        <p>contents</p>
        <p>contents</p>
      </ux-modal>
    </div>

    <div class="demo">
      <h6>custom footer</h6>
      <button class="ux-btn"
              @click="footerOpen">Open</button>
      <ux-modal v-model="footerVisible"
                :theme="theme"
                title="Custom Footer"
                @ok="onOk($event, 'custom footer')"
                @cancel="onCancel($event, 'custom footer')">
        <p>contents</p>
        <p>contents</p>
        <p>contents</p>
        <p>contents</p>
        <div slot="footer">
          <button class="ux-btn ux-btn-success"
                  @click="onSuccess">success</button>
        </div>
      </ux-modal>
    </div>

    <div class="demo">
      <h6>hide footer</h6>
      <button class="ux-btn"
              @click="hideFooterOpen">Open</button>
      <ux-modal v-model="hideFooterVisible"
                :theme="theme"
                title="Hide Footer"
                @ok="onOk($event, 'hide footer')"
                @cancel="onCancel($event, 'hide footer')">
        <p>contents</p>
        <p>contents</p>
        <p>contents</p>
        <p>contents</p>
      </ux-modal>
    </div>

    <div class="demo">
      <h6>custom btn text</h6>
      <button class="ux-btn"
              @click="customBtnOpen">Open</button>
      <ux-modal v-model="customBtnVisible"
                :theme="theme"
                title="Custom Btn Text"
                @ok="onOk($event, 'custom btn text')"
                @cancel="onCancel($event, 'custom btn text')"
                ok-text="确定"
                cancel-text="取消">
        <p>contents</p>
        <p>contents</p>
        <p>contents</p>
        <p>contents</p>
      </ux-modal>
    </div>

    <div class="demo">
      <h6>position</h6>
      <button class="ux-btn"
              @click="customStyleOpen">
        custom style open
      </button>
      <ux-modal v-model="customStyleVisible"
                :theme="theme"
                title="Custom Style"
                :dialog-style="{'top':'10px'}"
                @ok="onOk($event, 'custom style')"
                @cancel="onCancel($event, 'custom style')">
        <p>contents</p>
        <p>contents</p>
        <p>contents</p>
        <p>contents</p>
      </ux-modal>
      <button class="ux-btn"
              @click="verticalCenterOpen">
        vertical center modal
      </button>
      <ux-modal v-model="verticalCenterVisible"
                :theme="theme"
                title="Vertical Center Modal"
                wrap-class="vertical-center-modal"
                @ok="onOk($event, 'vertical center')"
                @cancel="onCancel($event, 'vertical center')">
        <p>contents</p>
        <p>contents</p>
        <p>contents</p>
        <p>contents</p>
      </ux-modal>
    </div>

    <div class="demo">
      <h6>nest modal</h6>
      <button class="ux-btn"
              @click="nestParentOpen">
        nest modal open
      </button>
      <ux-modal v-model="nestParentVisible"
                :theme="theme"
                title="Parent Modal"
                @ok="onOk($event, 'parent modal')"
                @cancel="onCancel($event, 'parent modal')">
        <button class="ux-btn ux-btn-error"
                @click="nestOpen">error</button>
        <ux-modal v-model="nestVisible"
                  :theme="theme"
                  @ok="onOk($event, 'nest modal')"
                  @cancel="onCancel($event, 'nest modal')">
          <span slot="title"
                style="color: red">Error Modal</span>
          <p>error Content</p>
        </ux-modal>
        <button class="ux-btn ux-btn-error"
                @click="nestOpen">error</button>
        <ux-modal v-model="nestVisible"
                  :theme="theme"
                  @ok="onOk($event, 'nest modal')"
                  @cancel="onCancel($event, 'nest modal')">
          <span slot="title"
                style="color: red">Error Modal</span>
          <p>error Content</p>
        </ux-modal>
        <button class="ux-btn ux-btn-error"
                @click="nestOpen">error</button>
        <ux-modal v-model="nestVisible"
                  :theme="theme"
                  @ok="onOk($event, 'nest modal')"
                  @cancel="onCancel($event, 'nest modal')">
          <span slot="title"
                style="color: red">Error Modal</span>
          <p>error Content</p>
        </ux-modal>
      </ux-modal>
    </div>

    <div class="demo">
      <h6>confirm</h6>
      <button class="ux-btn"
              @click="confirm">confirm</button>
      <button class="ux-btn"
              @click="deleteConfirm">delete</button>
    </div>

    <div class="demo">
      <h6>message</h6>
      <button class="ux-btn"
              @click="showInfo">Info</button>
      <button class="ux-btn"
              @click="showError">Error</button>
      <button class="ux-btn"
              @click="showWarning">Warning</button>
      <button class="ux-btn"
              @click="showSuccess">Success</button>
    </div>

    <button @click="onDestroy">Destroy</button>

    <div class="demo">
      <h6>store</h6>
      <button class="ux-btn ux-btn-error"
              @click="storeOpen">store modal</button>
      storeVisible {{storeVisible}}
      <ux-modal v-model="storeVisible"
                :theme="theme">
        <store-cmp />
        <p>error Content</p>
      </ux-modal>
      <store-cmp/>
    </div>

    <h4>control</h4>
    <div class="demo">
      <ux-button @click="showControlModal">showControlModal</ux-button>
      <ux-modal v-model="controlVisible"
                control
                :theme="theme"
                @ok="onControlOk"
                @cancel="onControlCancel">
        <p>control Content</p>
      </ux-modal>
    </div>
  </div>
</template>


<script>
  import Vue from 'vue';
  import { Button, Modal } from '@suning/uxcool';

  Vue.component('StoreCmp', {
    created() {
      console.log('store-cmp', this.$store);
    },
    render() {
      return 'store';
    },
  });
  export default {
    components: {
      UxModal: Modal,
      UxButton: Button,
    },
    data() {
      return {
        theme: 'light',
        basicVisible: false,
        footerVisible: false,
        hideFooterVisible: false,
        customBtnVisible: false,
        customStyleVisible: false,
        verticalCenterVisible: false,
        nestParentVisible: false,
        nestVisible: false,
        storeVisible: false,
        controlVisible: false,
      };
    },
    methods: {
      changeTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        Modal.config({ theme: this.theme });
      },
      baiscOpen() {
        this.basicVisible = true;
      },
      footerOpen() {
        this.footerVisible = true;
      },

      hideFooterOpen() {
        this.hideFooterVisible = true;
      },
      customBtnOpen() {
        this.customBtnVisible = true;
      },
      customStyleOpen() {
        this.customStyleVisible = true;
      },
      verticalCenterOpen() {
        this.verticalCenterVisible = true;
      },
      nestParentOpen() {
        this.nestParentVisible = true;
      },
      nestOpen() {
        this.nestVisible = true;
      },
      storeOpen() {
        this.storeVisible = true;
      },
      onOk(e, from) {
        console.log(`${from} ok`, e);
      },
      onCancel(e, from) {
        console.log(`${from} cancel`, e);
      },
      showControlModal() {
        this.controlVisible = !this.controlVisible;
      },
      onControlOk() {
        setTimeout(() => {
          console.log('control close');
          this.controlVisible = false;
        }, 2500);
      },
      onControlCancel() {
        setTimeout(() => {
          console.log('control close');
          this.controlVisible = false;
        }, 2500);
      },
      onSuccess(e) {
        this.footerVisible = false;
        console.log('success', e);
      },
      onClose(e) {
        console.log('close', e);
      },
      onAfterClose(e) {
        console.log('afterClose', e);
      },
      confirm() {
        Modal.confirm({
          title: 'Do you Want to delete these items?',
          content: 'Some Descriptions',
        }).then(
          () => {
            console.log('confirm ok');
          },
          () => {
            console.log('confirm cancel');
          }
        );
      },
      deleteConfirm() {
        Modal.confirm({
          title: 'Are you sure delete this task?',
          content: 'Some descriptions',
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          theme: 'dark',
        }).then(
          () => {
            console.log('delete ok');
          },
          () => {
            console.log('delete cancel');
          }
        );
      },
      showInfo() {
        Modal.info({
          title: 'This is Notification Message',
          content: (
            <div style={{ color: 'yellow' }}>
              <p>some content vnode</p>
            </div>
          ),
        }).catch(() => {
          console.log('info');
        });
      },
      showError() {
        Modal.error({
          title: 'This is an error message',
          content: '<span style="color:red">Error Content</span>',
          dangerouslySetInnerHTML: true,
        }).then(
          () => {
            console.log('error ok');
          },
          () => {
            console.log('error close');
          }
        );
      },
      showWarning() {
        Modal.warning({
          title: <span style={{ color: '#999' }}>This is an warning message</span>,
          /* global h */
          content: h(
            'span',
            {
              style: {
                color: 'skyblue',
              },
            },
            'warning message'
          ),
        }).then(() => {
          console.log('warning ok');
        });
      },
      showSuccess() {
        Modal.success({
          title: 'This is an success message',
          content: <span style={{ color: 'green' }}>success message</span>,
        }).then(() => {
          console.log('success ok');
        });
      },
      onDestroy() {
        Modal.destroy();
      },
    },
  };
</script>

<style lang="scss">
  .a {
    color: red;
  }
  .vertical-center-modal {
    text-align: center;
    &:before {
      content: '';
      display: inline-block;
      height: 100%;
      vertical-align: middle;
    }
    .ux-modal {
      display: inline-block;
      top: 0;
      vertical-align: middle;
      text-align: left;
    }
  }
</style>
