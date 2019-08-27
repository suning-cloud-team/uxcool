
<script>
  import ScrollableInkTabBar from './scrollableInkTabBar.vue';
  import { isVertical } from './utils';

  export default {
    name: 'TabBar',
    components: {
      ScrollableInkTabBar,
    },
    props: {
      prefixCls: String,
      tabs: Array,
      tabBarPosition: String,
      size: String,
      extraContent: Array,
    },
    computed: {
      classes() {
        const { prefixCls } = this;
        return `${prefixCls}-bar`;
      },
      extraClasses() {
        const { prefixCls } = this;
        return `${prefixCls}-extra-content`;
      },
      isLeftOrRight() {
        const { tabBarPosition } = this;
        return isVertical(tabBarPosition);
      },
      extraStyle() {
        const { isLeftOrRight } = this;
        return isLeftOrRight ? null : { float: 'right' };
      },
    },
    render() {
      const {
        classes,
        $refs,
        $listeners,
        $props: { extraContent, ...bindProps },
        extraClasses,
        extraStyle,
        isLeftOrRight,
      } = this;

      const tabBar = (
        <scrollable-ink-tab-bar
          root-node={$refs.tablistRef}
          {...{ props: bindProps, on: $listeners }}
        />
      );
      const children = [tabBar];

      if (extraContent) {
        const extra = (
          <div class={extraClasses} style={extraStyle}>
            {extraContent}
          </div>
        );

        if (isLeftOrRight) {
          children.push(extra);
        } else {
          children.unshift(extra);
        }
      }

      return (
        <div ref="tablistRef" role="tablist" tabindex="0" class={classes}>
          {children}
        </div>
      );
    },
  };
</script>
