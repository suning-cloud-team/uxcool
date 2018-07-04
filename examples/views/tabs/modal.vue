<template>
  <div class="demo">
    <ux-button @click="showModal">showModal</ux-button>
    <ux-modal v-model="basicVisible">
      <ux-tabs v-if="isFeatureDialogShown"
               :value="selectedTabInFeature">
        <ux-tab-pane tab="PC/HTML"
                     name="HTML">
          HTML
        </ux-tab-pane>
        <ux-tab-pane tab="IOS"
                     name="IOS">
          IOS
        </ux-tab-pane>
        <ux-tab-pane tab="Android"
                     name="ANDROID">
          ANDROID
        </ux-tab-pane>
        <ux-tab-pane tab="微信"
                     name="WXAPP">
          WXAPP
        </ux-tab-pane>
      </ux-tabs>
    </ux-modal>
  </div>
</template>

<script>
  import { Tabs, Button, Modal } from '@suning/uxcool';

  export default {
    components: {
      UxTabs: Tabs,
      UxTabPane: Tabs.TabPane,
      UxModal: Modal,
      UxButton: Button,
    },
    data() {
      return {
        value: '2',
        basicVisible: false,
        isFeatureDialogShown: true,
        selectedTabInFeature: 'ANDROID',
      };
    },
    created() {
      setTimeout(() => {
        this.value = '2';
        this.isFeatureDialogShown = true;
      }, 2500);
    },
    methods: {
      showModal() {
        this.basicVisible = true;
      },
      onTabClick(...args) {
        console.log(...args);
      },
    },
  };
</script>
