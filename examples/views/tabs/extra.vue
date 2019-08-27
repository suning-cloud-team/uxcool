<template>
  <div class="demo">
    <h6>extra</h6>
    <ux-select :value="selectedPosition"
               @change="selectChange">
      <ux-option value="top">top</ux-option>
      <ux-option value="left">left</ux-option>
      <ux-option value="right">right</ux-option>
      <ux-option value="bottom">bottom</ux-option>
    </ux-select>
    <ux-tabs :tab-position="selectedPosition">
      <ux-tab-pane v-for="(pane,i) in panes"
                   :key="i"
                   :disabled="pane.disabled"
                   :tab="pane.tab"
                   :name="pane.name">
        {{ pane.content }}
      </ux-tab-pane>
      <button slot="tabBarExtraContent"
              class="ux-btn ux-btn-default">extra</button>
    </ux-tabs>
    <ux-tabs :tab-position="selectedPosition">
      <ux-tab-pane v-for="(pane,i) in panes"
                   :key="i"
                   :disabled="pane.disabled"
                   :tab="pane.tab"
                   :name="pane.name">
        {{ pane.content }}
      </ux-tab-pane>
      <div slot="tabBarExtraContent"><button class="ux-btn ux-btn-default"
                @click="add">{{ count }}</button></div>
    </ux-tabs>
  </div>
</template>

<script>
  import { UxTabs, UxTabPane } from '@suning/uxcool/src/components/tabs';
  import { UxSelect, UxOption } from '@suning/uxcool/src/components/select';

  export default {
    components: {
      UxTabs,
      UxTabPane,
      UxSelect,
      UxOption,
    },
    data() {
      return {
        selectedPosition: 'top',
        panes: Array.from({ length: 20 }, (_, i) => ({
          tab: `Tab ${i}`,
          name: `name${i}`,
          content: `Tab ${i} Content`,
        })),
        count: 0,
      };
    },
    methods: {
      selectChange(selectedVal) {
        this.selectedPosition = selectedVal.value;
      },
      add() {
        this.count += 1;
      },
    },
  };
</script>
