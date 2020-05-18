<template>
  <div class="demo">
    <p>x：每一级下的节点总数。y：每级节点里有y个节点、存在子节点。z：树的level层级数（0表示一级）</p>
    <ux-form layout="inline"
             @submit="onSumbit">
      <ux-form-item name="X"
                    label="X">
        <ux-input-number :min="0"
                         v-model="vx" />
      </ux-form-item>
      <ux-form-item name="Y"
                    label="Y">
        <ux-input-number :min="0"
                         v-model="vy" />
      </ux-form-item>
      <ux-form-item name="Z"
                    label="Z">
        <ux-input-number :min="0"
                         v-model="vz" />
      </ux-form-item>
      <ux-form-item>
        <ux-button html-type="submit">generate</ux-button>
      </ux-form-item>
    </ux-form>
    <div>
      总节点数:
      <strong>{{ nums }}</strong>
    </div>
    <ux-search-input placeholder="Search"
                     @input="onSearchInput" />
    <ux-tree ref="tree1"
             :expanded-keys="expandedKeys"
             :data-source="dataSource"
             checkable
             @select="onSelect"
             @check="onCheck"
             @expand="onExpand" />

  </div>
</template>


<script>
  import { Tree, Form, InputNumber, Button, Input } from '@cloud-sn/uxcool';

  function generateData(x = 3, y = 2, z = 1) {
    // x：每一级下的父节点总数。y：每级节点里有y个叶子节点、存在子节点。z：树的level层级数（0表示一级）
    function loop(_level, _preKey) {
      const ret = [];
      const preKey = _preKey || '0';
      if (_level >= 0) {
        const level = _level - 1;
        for (let i = 0; i < x; i += 1) {
          const key = `${preKey}-${i}`;
          const item = { title: `${key}-label`, key: `${key}-key` };
          item.children = loop(level, key);
          ret.push(item);
        }
      } else {
        for (let i = 0; i < y; i += 1) {
          const key = `${preKey}-leaf-${i}`;
          const item = { title: `${key}-leaf-label`, key: `${key}-leaf-key` };
          ret.push(item);
        }
      }
      return ret;
    }
    return loop(z);
  }

  function calcTotal(x = 3, y = 2, z = 1) {
    let n = y;
    for (let i = 0; i <= z; i += 1) {
      // eslint-disable-next-line
      n = x * n + x;
    }
    return n;
  }
  export default {
    components: {
      UxSearchInput: Input.Search,
      UxForm: Form,
      UxFormItem: Form.Item,
      UxButton: Button,
      UxInputNumber: InputNumber,
      UxTree: Tree,
      UxTreeNode: Tree.Node,
    },
    data() {
      return {
        vx: 15,
        vy: 20,
        vz: 1,
        expandedKeys: ['0-0-0-key'],
        dataSource: [],
        nums: 0,
      };
    },
    created() {
      this.genData();
      setTimeout(() => {
        // console.log('update multiple');
        // this.multiple = false;
        // this.checkedKeys = ['0-0-1-2', '0-1-0'];
        // // this.selectable = false;
        // this.checkStrict = true;
        // setTimeout(() => {
        //   this.checkStrict = false;
        // }, 3000);
      }, 5000);
    },
    methods: {
      onSearchInput(val) {
        this.$refs.tree1.filter(val);
      },
      genData() {
        const { vx, vy, vz } = this;
        this.dataSource = generateData(vx, vy, vz);
        this.nums = calcTotal(vx, vy, vz);
      },
      onSumbit() {
        console.time();
        this.genData();
        console.timeEnd();
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
