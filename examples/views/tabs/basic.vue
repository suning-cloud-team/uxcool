<template>
  <div>
    <button class="ux-btn"
            @click="changeTheme">{{theme}}</button>
    <div class="demo">
      <h6>basic</h6>
      <ux-tabs :theme="theme">
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
        <ux-tab-pane tab="Tab 1"
                     name="1">
          Tab 1 Content
        </ux-tab-pane>
        <ux-tab-pane disabled
                     tab="Tab 2"
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
      <h6>custom icon</h6>
      <ux-tabs @tab-click="onTabClick"
               :theme="theme">
        <ux-tab-pane name="1">
          <span slot="tab">
            <i class="fu fu-account"></i> Tab 1
          </span>
          Tab 1 Content
        </ux-tab-pane>
        <ux-tab-pane name="2">
          <span slot="tab">
            <i class="fu fu-star"></i>Tab 2
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
        <button class="ux-btn ux-btn-default"
                :class="{active: mode === 'top'}"
                @click="changeMode('top')">horizontal</button>
        <button class="ux-btn ux-btn-default"
                :class="{active: mode === 'left'}"
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
          {{pane.content}}
        </ux-tab-pane>
      </ux-tabs>
    </div>

    <div class="demo">
      <h6>size</h6>
      <div class="ux-btn-group">
        <button class="ux-btn ux-btn-default"
                :class="{active: size === 'small'}"
                @click="changeSize('small')">small</button>
        <button class="ux-btn ux-btn-default"
                :class="{active: size === 'default'}"
                @click="changeSize('default')">default</button>
        <button class="ux-btn ux-btn-default"
                :class="{active: size === 'large'}"
                @click="changeSize('large')">large</button>
      </div>
      <ux-tabs :size="size"
               :theme="theme">
        <ux-tab-pane v-for="(pane,i) in panes"
                     :key="i"
                     :disabled="pane.disabled"
                     :tab="pane.tab"
                     :name="pane.name">
          {{pane.content}}
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
  </div>
</template>


<script>
  import '@suning/uxcool/src/components/tabs/style/index.scss';
  import { UxSelect, UxOption } from '@suning/uxcool/src/components/select';
  import { UxTabs, UxTabPane } from '@suning/uxcool/src/components/tabs';
  import EventDemo from './event.vue';

  export default {
    components: {
      UxTabs,
      UxTabPane,
      UxSelect,
      UxOption,
      EventDemo,
    },
    data() {
      return {
        theme: 'light',
        panes: [],
        currentPane: null,
        mode: 'top',
        size: 'default',
        selectedPosition: 'top',
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

