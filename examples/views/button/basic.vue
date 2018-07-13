<template>
  <div>
    <div class="demo">
      <h6>normal</h6>
      <ux-button type="primary">Primary</ux-button>
      <ux-button>Default</ux-button>
      <ux-button type="dashed">Dashed</ux-button>
      <ux-button type="danger">危险</ux-button>
    </div>
    <div class="demo">
      <h6>icon</h6>
      <ux-button type="primary"
                 @click="onClick"
                 @click.native="onNativeClick"
                 shape="circle"
                 icon="search" />
      <ux-button type="primary"
                 icon="search">Search</ux-button>
      <ux-button shape="circle"
                 icon="search" />
      <ux-button icon="search">Search</ux-button>
      <br>
      <ux-button shape="circle"
                 icon="search" />
      <ux-button icon="search">Search</ux-button>
      <ux-button type="dashed"
                 shape="circle"
                 icon="search" />
      <ux-button type="dashed"
                 icon="search">Search</ux-button>
    </div>
    <div class="demo">
      <h6>disabled</h6>
      <ux-button type="primary">Primary</ux-button>
      <ux-button type="primary"
                 disabled>Primary(disabled)</ux-button>
      <br>
      <ux-button>Default</ux-button>
      <ux-button disabled>Default(disabled)</ux-button>
      <br>
      <ux-button>Ghost</ux-button>
      <ux-button disabled>Ghost(disabled)</ux-button>
      <br>
      <ux-button type="dashed">Dashed</ux-button>
      <ux-button type="dashed"
                 disabled>Dashed(disabled)</ux-button>
    </div>
    <div class="demo">
      <h6>href</h6>
      <ux-button type="primary"
                 href="http://www.suning.com"
                 target="_blank">Primary</ux-button>
      <ux-button type="primary"
                 href="http://www.suning.com"
                 disabled
                 target="_blank">Primary(disabled)</ux-button>
      <br>
      <ux-button href="http://www.suning.com"
                 target="_blank">Default</ux-button>
      <ux-button target="_blank"
                 disabled>Default(disabled)</ux-button>
      <br>
      <ux-button href="http://www.suning.com"
                 target="_blank">Ghost</ux-button>
      <ux-button href="http://www.suning.com"
                 target="_blank"
                 disabled>Ghost(disabled)</ux-button>
      <br>
      <ux-button href="http://www.suning.com"
                 target="_blank"
                 type="dashed">Dashed</ux-button>
      <ux-button href="http://www.suning.com"
                 target="_blank"
                 type="dashed"
                 disabled>Dashed(disabled)</ux-button>
    </div>

    <div class="demo">
      <h6>loading</h6>
      <ux-button type="primary"
                 loading>
        Loading
      </ux-button>
      <ux-button type="primary"
                 size="small"
                 loading>
        Loading
      </ux-button>
      <br>
      <ux-button type="primary"
                 :loading="loading"
                 @click="onLoadClick">
        Click me!
      </ux-button>
      <ux-button type="primary"
                 icon="send_out"
                 :loading="iconLoading"
                 @click="onIconClick">Click me!</ux-button>

      <ux-button type="primary"
                 icon="send_out"
                 :loading="{delay:1500}">
        Click me!
      </ux-button>
      <br>
      <ux-button shape="circle"
                 loading />
      <ux-button type="primary"
                 shape="circle"
                 loading />
    </div>

    <div class="demo">
      <h6>group</h6>
      <ux-button-group>
        <ux-button>Canel</ux-button>
        <ux-button>Ok</ux-button>
      </ux-button-group>

      <ux-button-group>
        <ux-button disabled>L</ux-button>
        <ux-button disabled>M</ux-button>
        <ux-button disabled>R</ux-button>
      </ux-button-group>
      <br>
      <ux-button-group>
        <ux-button>L</ux-button>
        <ux-button>M</ux-button>
        <ux-button>R</ux-button>
      </ux-button-group>

      <br>

      <ux-button-group>
        <ux-button type="primary">
          <Icon type="left" />Go Back
        </ux-button>
        <ux-button type="primary">
          Go Forward
          <Icon type="right" />
        </ux-button>
      </ux-button-group>

      <ux-button-group>
        <ux-button type="primary"
                   icon="cloud_upload" />
        <ux-button type="primary"
                   icon="cloud_download" />
      </ux-button-group>
    </div>

    <div class="demo"
         style="background: #ccc;padding: 10px">
      <h6>ghost</h6>
      <ux-button type="primary"
                 ghost>Primary</ux-button>
      <ux-button ghost>Default</ux-button>
      <ux-button type="dashed"
                 ghost>Dashed</ux-button>
      <ux-button type="danger"
                 ghost>danger</ux-button>
    </div>

    <div class="demo">
      <h6>size</h6>
      <ux-radio-group v-model="size"
                      @change="onChangeSize">
        <ux-radio-button value="large">Large</ux-radio-button>
        <ux-radio-button value="default">Default</ux-radio-button>
        <ux-radio-button value="small">small</ux-radio-button>
      </ux-radio-group>
      <br>
      <br>
      <ux-button type="primary"
                 :size="size">Primary</ux-button>
      <ux-button :size="size">Default</ux-button>
      <ux-button type="dashed"
                 :size="size">Dashed</ux-button>
      <ux-button type="danger"
                 :size="size">Danger</ux-button>

      <br>
      <ux-button type="primary"
                 shape="circle"
                 icon="search"
                 :size="size" />
      <ux-button type="primary"
                 icon="search"
                 :size="size">Search</ux-button>
      <br>
      <ux-button-group :size="size">
        <ux-button type="primary">
          <Icon type="left" />Back
        </ux-button>
        <ux-button type="primary">
          Forward
          <Icon type="right" />
        </ux-button>
      </ux-button-group>
    </div>
    <div class="demo">
      <h6>size</h6>
      <ux-radio-group v-model="size"
                      @change="onChangeSize">
        <ux-radio-button value="large">Large</ux-radio-button>
        <ux-radio-button value="default">Default</ux-radio-button>
        <ux-radio-button value="small">small</ux-radio-button>
      </ux-radio-group>
      <br>
      <br>
      <ux-button type="primary"
                 :size="size">primary</ux-button>
      <ux-button :size="size">default</ux-button>
      <ux-button type="dashed"
                 :size="size">dashed</ux-button>
      <ux-button type="danger"
                 :size="size">danger</ux-button>

      <br>
      <ux-button type="primary"
                 shape="circle"
                 icon="search"
                 :size="size" />
      <ux-button type="primary"
                 icon="search"
                 :size="size">search</ux-button>
      <br>
      <ux-button-group :size="size">
        <ux-button type="primary">
          <Icon type="left" />back
        </ux-button>
        <ux-button type="primary">
          forward
          <Icon type="right" />
        </ux-button>
      </ux-button-group>
    </div>

    <chinese-demo />
    <time-demo />
  </div>
</template>


<script>
  import { Button, Icon, Radio } from '@suning/uxcool';
  import ChineseDemo from './chinese.vue';
  import TimeDemo from './time.vue';

  export default {
    components: {
      UxButton: Button,
      UxButtonGroup: Button.Group,
      Icon,
      UxRadioGroup: Radio.Group,
      UxRadioButton: Radio.Button,
      TimeDemo,
      ChineseDemo,
    },
    data() {
      return {
        tes: '测试',
        loading: false,
        iconLoading: false,
        size: 'large',
      };
    },
    created() {
      setTimeout(() => {
        this.tes = '测试一二';
      }, 2500);
    },
    methods: {
      onLoadClick() {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
        }, 2500);
      },
      onIconClick() {
        this.iconLoading = true;
        setTimeout(() => {
          this.iconLoading = false;
        }, 2500);
      },
      onClick() {
        console.log('click');
      },
      onNativeClick(e) {
        console.log('native click', e);
      },
      onChangeSize(val) {
        console.log('val', val);
        this.size = val;
      },
    },
  };
</script>


<style>
  .demo > .ux-btn,
  .demo > .ux-btn-group {
    margin: 0 10px 10px 0;
  }
</style>
