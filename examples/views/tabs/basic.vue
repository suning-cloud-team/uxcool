<template>
  <div>
    <button class="ux-btn"
            @click="changeTheme">{{ theme }}</button>
    <div class="demo">
      <h6>basic</h6>
      <ux-tabs :theme="theme"
               value="2">
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
      </ux-tabs>
    </div>

    <div class="demo">
      <h6>disabled</h6>
      <ux-tabs :theme="theme">
        <ux-tab-pane :disabled="disabled"
                     tab="tab1"
                     name="1">
          <!-- <span slot="tab">tab {{ disabled ? 0 : 1 }}</span> -->
          Tab 1 Content
        </ux-tab-pane>
        <ux-tab-pane :disabled="disabled"
                     tab="Tab 2"
                     name="2">
          Tab 2 Content
        </ux-tab-pane>
        <ux-tab-pane :disabled="disabled"
                     tab="Tab 3"
                     name="3">
          Tab 3 Content
        </ux-tab-pane>
      </ux-tabs>
    </div>

    <div class="demo">
      <h6>custom icon</h6>
      <ux-tabs :theme="theme"
               @tab-click="onTabClick">
        <ux-tab-pane name="1">
          <span slot="tab">
            <i class="fu fu-account" /> Tab 1
          </span>
          Tab 1 Content
        </ux-tab-pane>
        <ux-tab-pane name="2">
          <span slot="tab">
            <i class="fu fu-star" />Tab 2
          </span>
          Tab 2 Content
        </ux-tab-pane>
        <ux-tab-pane tab="Tab 3"
                     name="3">
          Tab 3 Content
        </ux-tab-pane>
      </ux-tabs>
    </div>

    <div class="demo">
      <h6>scroll</h6>
      <div class="ux-btn-group">
        <button :class="{active: mode === 'top'}"
                class="ux-btn ux-btn-default"
                @click="changeMode('top')">horizontal</button>
        <button :class="{active: mode === 'left'}"
                class="ux-btn ux-btn-default"
                @click="changeMode('left')">vertical</button>
      </div>
      <ux-tabs :tab-position="mode"
               :theme="theme"
               style="height: 150px">
        <ux-tab-pane v-for="(pane,i) in panes"
                     :key="i"
                     :disabled="pane.disabled"
                     :tab="pane.tab"
                     :name="pane.name">
          {{ pane.content }}
        </ux-tab-pane>
      </ux-tabs>
    </div>

    <div class="demo">
      <h6>size</h6>
      <div class="ux-btn-group">
        <button :class="{active: size === 'small'}"
                class="ux-btn ux-btn-default"
                @click="changeSize('small')">small</button>
        <button :class="{active: size === 'default'}"
                class="ux-btn ux-btn-default"
                @click="changeSize('default')">default</button>
        <button :class="{active: size === 'large'}"
                class="ux-btn ux-btn-default"
                @click="changeSize('large')">large</button>
      </div>
      <ux-tabs :size="size"
               :theme="theme">
        <ux-tab-pane v-for="(pane,i) in panes"
                     :key="i"
                     :disabled="pane.disabled"
                     :tab="pane.tab"
                     :name="pane.name">
          {{ pane.content }}
        </ux-tab-pane>
      </ux-tabs>
    </div>

    <div class="demo">
      <h6>position</h6>
      <ux-select :value="selectedPosition"
                 :theme="theme"
                 @change="selectChange">
        <ux-option value="top">top</ux-option>
        <ux-option value="left">left</ux-option>
        <ux-option value="right">right</ux-option>
        <ux-option value="bottom">bottom</ux-option>
      </ux-select>
      <ux-tabs :tab-position="selectedPosition"
               :theme="theme"
               :style="positionStyle"
               @tab-click="onTabClick">
        <ux-tab-pane v-for="(pane,i) in panes"
                     :key="i"
                     :disabled="pane.disabled"
                     :tab="pane.tab"
                     :name="pane.name">
          {{ pane.content }}
        </ux-tab-pane>
      </ux-tabs>
    </div>
    <div class="demo">
      <h6>card</h6>
      <ux-tabs :theme="theme"
               type="card">
        <ux-tab-pane v-for="(pane,i) in panes"
                     :key="i"
                     :disabled="pane.disabled"
                     :tab="pane.tab"
                     :name="pane.name">
          {{ pane.content }}
        </ux-tab-pane>
      </ux-tabs>
    </div>
    <event-demo />
    <modal-demo />
    <control-demo />
    <color-demo />
    <tab-slot-demo />
    <extra-demo />
  </div>
</template>


<script>
  import '@suning/uxcool/src/components/tabs/style/index.scss';
  import { UxSelect, UxOption } from '@suning/uxcool/src/components/select';
  import { UxTabs, UxTabPane } from '@suning/uxcool/src/components/tabs';
  import EventDemo from './event.vue';
  import ModalDemo from './modal.vue';
  import ControlDemo from './control.vue';
  import ColorDemo from './color.vue';
  import TabSlotDemo from './tab-slot.vue';
  import ExtraDemo from './extra.vue';

  export default {
    components: {
      UxTabs,
      UxTabPane,
      UxSelect,
      UxOption,
      EventDemo,
      ModalDemo,
      ControlDemo,
      ColorDemo,
      TabSlotDemo,
      ExtraDemo,
    },
    data() {
      return {
        theme: 'light',
        panes: [],
        currentPane: null,
        mode: 'top',
        size: 'default',
        selectedPosition: 'top',
        isFeatureDialogShown: false,
        selectedTabInFeature: 'ANDROID',
        disabled: true,
      };
    },
    computed: {
      positionStyle() {
        const { selectedPosition } = this;
        let style = {};
        if (selectedPosition === 'left' || selectedPosition === 'right') {
          style = {
            height: '220px',
          };
        }
        return style;
      },
    },
    created() {
      this.panes = Array(20)
        .fill(0)
        .map((v, i) => ({
          tab: `Tab ${i}`,
          name: `name${i}`,
          content: `Tab ${i} Content`,
        }));

      this.currentPane = this.panes[0].name;

      setTimeout(() => {
        this.isFeatureDialogShown = true;
        this.disabled = false;
      }, 2500);
    },
    methods: {
      changeTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
      },
      onTabClick(...args) {
        console.log(...args);
      },
      changeMode(mode) {
        this.mode = mode;
      },
      changeSize(size) {
        this.size = size;
      },
      selectChange(selectedVal) {
        this.selectedPosition = selectedVal.value;
      },
    },
  };
</script>

