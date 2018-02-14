<template>
  <ux-demo title="大小"
           vertical>
    <div slot="demo">
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
               :theme="theme"
               value="name5"
               @tab-click="onTabClick">
        <ux-tab-pane v-for="(pane,i) in panes"
                     :key="i"
                     :disabled="pane.disabled"
                     :tab="pane.tab"
                     :name="pane.name">
          {{pane.content}}
        </ux-tab-pane>
      </ux-tabs>
    </div>
    <div slot="desc">调整tabs大小</div>
    <ux-code slot="code">
      {{code}}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/tabs/size';

  export default {
    data() {
      return {
        panes: [],
        size: 'default',
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

      this.currentPane = this.panes[0].name;
    },
    methods: {
      onTabClick(...args) {
        console.log(args);
      },
      changeSize(size) {
        this.size = size;
      },
    },
  };
</script>
