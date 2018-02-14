<template>
  <ux-demo title="滑动"
           vertical>
    <div slot="demo">
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
    <div slot="desc">当标签超出容器宽度后,自动出现滑动按钮, 可左右,上下滑动</div>
    <ux-code slot="code">
      {{code}}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/tabs/scroll';

  export default {
    data() {
      return {
        panes: [],
        mode: 'top',
        code,
      };
    },
    computed: {
      theme() {
        return this.$store.state.theme;
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
    },
    methods: {
      changeMode(mode) {
        this.mode = mode;
      },
    },
  };
</script>


