<template>
  <div>
    <div class="ux-btn-group">
      <button :class="{active: mode === 'top'}"
              class="ux-btn ux-btn-default"
              @click="changeMode('top')">horizontal</button>
      <button :class="{active: mode === 'left'}"
              class="ux-btn ux-btn-default"
              @click="changeMode('left')">vertical</button>
    </div>
    <ux-tabs :tab-position="mode"
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
</template>

<script>
  export default {
    data() {
      return {
        panes: [],
        mode: 'top',
      };
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
