<script>
  import TabBar from './tabBar.vue';
  import TabContent from './tabContent.vue';

  export default {
    name: 'Tabs',
    provide() {
      return {
        tabRoot: this,
      };
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
      value: String,
      destroyInactiveTabPane: Boolean,
      animated: { type: Boolean, default: true },
      size: {
        type: String,
        default: 'default',
      },
    },
    data() {
      return {
        init: false,
        descendants: [],
        activeName: '',
      };
    },
    created() {
      this.activeName = this.value;
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
    methods: {
      getTabs() {
        const { descendants } = this;
        return descendants.map((v, i) => ({
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
        const filterDescendants = slotDefault.filter(node =>
          /^([a-zA-Z]+)-tab-pane$/.test((node.componentOptions || {}).tag));
        const idx = filterDescendants.indexOf($vnode);
        this.descendants.splice(idx, 0, item);
      },
      removeDescendant(item) {
        this.descendants = this.descendants.filter(v => v !== item);
      },
      onTabClick(tab, name, e) {
        this.setActiveName(name);
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
        getTabs,
      } = this;
      const tabs = getTabs();
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

    components: {
      TabContent,
      TabBar,
    },
    watch: {
      value(nVal) {
        this.setActiveName(nVal);
      },
      descendants() {
        const { descendants, init, activeName } = this;
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
  };
</script>
