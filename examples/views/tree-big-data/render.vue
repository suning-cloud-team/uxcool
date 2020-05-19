<template>

  <div class="demo">
    <h4>render slot scope</h4>
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
        <span v-if="isShow">
          <ux-icon type="unhappy_o"/> {{ node.title }}-level-{{ node.level }}
        </span>
        <span v-else
              style="color: red">{{ node.title }}-level-22-{{ node.level }}</span>
      </span>
    </ux-tree>

    <h4>renderContent Function</h4>
    <ux-tree ref="tree1"
             :selected-keys="['0-0-0', '0-0-2']"
             :checked-keys="checkedKeys"
             :data-source="dataSource"
             :selectable="selectable"
             :render-content="renderContent"
             default-expand-all
             @select="onSelect"
             @check="onCheck"
             @expand="onExpand " />

  </div>
</template>


<script>
  import { Tree, Icon } from '@cloud-sn/uxcool';
  import DataMixin from './tree-data';

  export default {
    components: {
      UxTree: Tree.VirtualTree,
      UxIcon: Icon,
    },
    mixins: [DataMixin],
    data() {
      return {
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
      this.dataSource = this.createBigDataSource(100, 10, 10);
      setTimeout(() => {
        // console.log('update multiple');
        // this.multiple = false;
        // this.checkedKeys = ['0-0-1-2', '0-1-0'];
        // // this.selectable = false;
        // this.checkStrict = true;
        this.isShow = false;
        setTimeout(() => {
          this.checkStrict = false;
          this.isShow = true;
        }, 3000);
      }, 5000);
    },
    methods: {
      renderContent({ node }) {
        const { isShow } = this;
        return isShow ? (
          <span>
            <ux-icon type="blub" /> {node.title}-level-2222-{node.level}
          </span>
          ) : (
          <span style="color: green">
            {node.title}-level-333-{node.level}
          </span>
        );
      },
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
