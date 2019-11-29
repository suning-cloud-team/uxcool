<template>

  <div class="demo">
    <h4>render slot that has input form </h4>
    <ux-tree ref="tree1"
             :selected-keys="['0-0-0', '0-0-2']"
             :checked-keys="checkedKeys"
             :data-source="dataSource"
             :selectable="selectable"
             :view-count="20"
             default-expand-all
             @select="onSelect"
             @check="onCheck"
             @expand="onExpand">
      <span slot="renderContent"
            slot-scope="{node}">
        <span> {{ node.title }} </span>
        <ux-input
          v-model="node.originNode.dataValue"
          style="margin-left: 20px"
          size="small"/>
      </span>
    </ux-tree>
  </div>
</template>


<script>
  import { Tree, Icon, Input } from '@suning/uxcool';
  import DataMixin from './tree-data';

  export default {
    components: {
      UxTree: Tree.VirtualTree,
      UxIcon: Icon,
      UxInput: Input,
    },
    mixins: [DataMixin],
    data() {
      return {
        testData: '',
        checkedKeys: ['0-0'],
        expandedKeys: ['0-0', '0-0-1'],
        selectable: true,
        dataSource: [],
        checkStrict: false,
        isShow: true,
      };
    },
    created() {
      this.nodeAttr = {
        selectable: ['0-1-0-0'],
        disabled: ['0-1-0-1']
      };
      this.dataSource = this.createBigDataSource(10, 10);
    },
    methods: {
      onExpand(...args) {
        console.log('onExpand', ...args);
      },
      onCheck(...args) {
        console.log('onCheck', ...args);
      },
      onSelect(...args) {
        console.log('onSelect', ...args);
      },
    },
  };
</script>
