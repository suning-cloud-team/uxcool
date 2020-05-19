<template>
    <ux-topo :links="links" node-clz="item" :js-plumb-option="jsPlumbOption" :graph-option="graphOption">
      <div class="item" :key="item.id" v-for="item in list" :id="item.id">{{item.name}}</div>
    </ux-topo>
</template>

<style lang="scss">
.item {
  position: absolute;
  width: 150px;
  padding: 10px;
  background: #fff;
  border: 1px solid #ccc;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-radius: 10px;
  z-index: 10;
  text-align: left;
  cursor: pointer;
}
</style>


<script>
import UxTopo from '@cloud-sn/uxcool/src/extra/topology/Topo.vue';
import '@cloud-sn/uxcool/src/extra/topology/style/index.scss';

export default {
  data() {
    return {
      jsPlumbOption: {
        //   // 覆盖默认的flowchart类型
        // Connector: [
        //   'Bezier',
        //   {
        //     curviness: 100,
        //   },
        // ],
      },
      graphOption: {
        align: 'DR',
        nodesep: 30, // 节点与节点之间上下间距
        ranksep: 200, // 节点左右间距
      },
      // 这块是用来渲染节点的
      list: [
        {
          id: 'node1',
          name: 'act 1',
        },
        {
          id: 'node2',
          name: 'act 2',
        },
        {
          id: 'node3',
          name: 'act 3',
        },
        {
          id: 'node4',
          name: 'act 4',
        },
        {
          id: 'node5',
          name: 'act 5',
        },
        {
          id: 'node6',
          name: 'act 6',
        },
        {
          id: 'node7',
          name: 'act 7',
        },
        {
          id: 'node8',
          name: 'act 8',
        },
        {
          id: 'node9',
          name: 'act 9',
        },
        {
          id: 'node10',
          name: 'act 10',
        },
      ],
      // 这个用来指定边的关系
      links: [
        {
          from: 'node1',
          to: 'node2',
        },
        {
          from: 'node1',
          to: 'node3',
        },
        {
          from: 'node1',
          to: 'node4',
        },
        {
          from: 'node3',
          to: 'node5',
        },
        {
          from: 'node3',
          to: 'node6',
        },
        {
          from: 'node3',
          to: 'node7',
        },
        {
          from: 'node3',
          to: 'node8',
        },
        {
          from: 'node5',
          to: 'node9',
        },
        {
          from: 'node6',
          to: 'node9',
        },
        {
          from: 'node7',
          to: 'node9',
        },
        {
          from: 'node8',
          to: 'node10',
        },
      ],
    };
  },
  components: {
    UxTopo,
  },
};
</script>
