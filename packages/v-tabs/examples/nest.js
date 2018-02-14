import Vue from 'vue';

import '@suning/v-tabs/css/index.scss';

import { VTabs, VTabPane } from '@suning/v-tabs';

Vue.config.productionTip = false;
Vue.component('TTabs', {
  props: {
    prefixCls: {
      type: String,
      default: 't-tabs',
    },
    tabBarPosition: {
      type: String,
      default: 'top',
    },
    value: [String],
    destroyInactiveTabPane: Boolean,
    animated: Boolean,
  },
  render(h) {
    const { $props, $listeners } = this;
    return h(
      'v-tabs',
      {
        props: $props,
        on: $listeners,
      },
      this.$slots.default
    );
  },
  components: {
    VTabs,
  },
});

Vue.component('TTabPane', {
  props: {
    name: { type: String, required: true },
    tab: String,
    disabled: Boolean,
  },
  render(h) {
    const { $props, $listeners } = this;
    return h(
      'v-tab-pane',
      {
        props: $props,
        on: $listeners,
      },
      [this.$slots.tab, this.$slots.default]
    );
  },
  components: {
    VTabPane,
  },
});

Vue.component('CTabs', {
  props: {
    prefixCls: {
      type: String,
      default: 't-tabs',
    },
    tabBarPosition: {
      type: String,
      default: 'top',
    },
    value: [String],
    destroyInactiveTabPane: Boolean,
    animated: Boolean,
  },
  render(h) {
    const { $props, $listeners } = this;
    return h(
      't-tabs',
      {
        props: $props,
        on: $listeners,
      },
      this.$slots.default
    );
  },
});

Vue.component('CTabPane', {
  props: {
    name: { type: String, required: true },
    tab: String,
    disabled: Boolean,
  },
  render(h) {
    const { $props, $listeners } = this;
    return h(
      't-tab-pane',
      {
        props: $props,
        on: $listeners,
      },
      [this.$slots.tab, this.$slots.default]
    );
  },
});
const vm = new Vue({
  el: '#app',
  data: {
    panes: [],
    currentPane: '',
    seed: 0,
  },
  created() {
    this.panes = Array(5)
      .fill(0)
      .map((v, i) => ({
        tab: `test${i % 2 === 0 ? 'a'.repeat(5) : i}`,
        name: `name${i}`,
        content: `test content${i}`,
        disabled: i % 3 === 0,
      }));
    this.seed = this.panes.length;
    this.currentPane = this.panes[0].name;
  },
  methods: {
    onAdd() {
      const { panes, seed } = this;
      panes.push({
        tab: `test${seed % 2 === 0 ? 'a'.repeat(5) : seed}`,
        name: `name${seed}`,
        content: `test content${seed}`,
        disabled: seed % 3 === 0,
      });
      this.seed += 1;
    },
  },
  components: {
    VTabs,
    VTabPane,
  },
});
