<script>
  import { isSameTypeVNode } from '@suning/v-utils';
  import TabBar from './tabBar.vue';
  import TabContent from './tabContent.vue';

  export default {
    name: 'Tabs',
    provide() {
      return {
        tabRoot: this,
      };
    },
    components: {
      TabContent,
      TabBar,
    },
    props: {
      prefixCls: {
        type: String,
        default: 'v-tabs',
      },
      tabBarPosition: {
        type: String,
        default: 'top',
      },
      value: {
        type: String,
        default: undefined,
      },
      destroyInactiveTabPane: {
        type: Boolean,
        default: false,
      },
      animated: { type: Boolean, default: true },
      size: {
        type: String,
        default: 'default',
      },
      control: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        init: false,
        descendants: [],
        activeName: '',
        tabs: [],
      };
    },
    computed: {
      classes() {
        const { prefixCls, tabBarPosition } = this;
        return {
          [prefixCls]: true,
          [`${prefixCls}-${tabBarPosition}`]: true,
        };
      },
    },
    watch: {
      value(nVal) {
        this.setActiveName(nVal);
      },
      descendants() {
        const {
          descendants, init, activeName, getTabs
        } = this;

        // http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/236
        // trigger render
        getTabs();

        if (descendants.length === 0) {
          return;
        }
        if (!init) {
          if (!activeName) {
            // 默认选择第一项
            let [descendant] = descendants.filter(v => !v.disabled);
            descendant = descendant || descendants[0];
            if (descendant) {
              this.setActiveName(descendant.name);
            }
          }
          this.init = true;
        }
      },
    },
    created() {
      this.activeName = this.value;
      const { getTabs } = this;
      getTabs();

      // slot不是响应式的，利用事件通知父组件重新调render函数渲染
      // http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/218
      this.$on('tab-update', () => {
        getTabs();
      });
    },
    methods: {
      getTabs() {
        const { descendants } = this;
        this.tabs = descendants.map((v, i) => ({
          idx: i,
          isActive: v.isActive,
          disabled: v.disabled,
          tab: v.$slots.tab || v.tab,
          name: v.name,
          vm: v,
        }));
      },
      setActiveName(name) {
        this.activeName = name;
      },
      addDescendant(item) {
        const { $slots } = this;
        const { default: slotDefault } = $slots;
        let { $vnode } = item;
        while ($vnode.parent) {
          $vnode = $vnode.parent;
        }

        // http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/188
        const filterDescendants = slotDefault.filter(node => isSameTypeVNode(node, 'isTabPane'));
        const idx = filterDescendants.indexOf($vnode);
        this.descendants.splice(idx, 0, item);
      },
      removeDescendant(item) {
        this.descendants = this.descendants.filter(v => v !== item);
      },
      onTabClick(tab, name, e) {
        const { control } = this;
        if (!control) {
          this.setActiveName(name);
        }
        this.$emit('tab-click', tab, name, e);
      },
      onPrevClick(e) {
        this.$emit('prev-click', e);
      },
      onNextClick(e) {
        this.$emit('next-click', e);
      },
    },
    render() {
      const {
        prefixCls,
        classes,
        tabBarPosition,
        size,
        onTabClick,
        onPrevClick,
        onNextClick,
        animated,
        $slots,
        tabs,
      } = this;

      const tabBar = (
        <tab-bar
          prefixCls={prefixCls}
          tabs={tabs}
          tabBarPosition={tabBarPosition}
          size={size}
          on-tab-click={onTabClick}
          on-prev-click={onPrevClick}
          on-next-click={onNextClick}
        />
      );

      const [activeTab] = tabs.filter(v => v.isActive);
      let activeIdx = -1;
      if (activeTab) {
        activeIdx = activeTab.idx;
      }
      const tabContent = (
        <tab-content
          prefixCls={prefixCls}
          animated={animated}
          tabBarPosition={tabBarPosition}
          activeIdx={activeIdx}
        >
          {$slots.default}
        </tab-content>
      );
      const childrens = tabBarPosition === 'bottom' ? [tabContent, tabBar] : [tabBar, tabContent];
      return <div class={classes}>{childrens}</div>;
    },
  };
</script>
