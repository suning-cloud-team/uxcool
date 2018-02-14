<template>
  <ux-demo title="基本用法"
           vertical>
    <div slot="demo">
      <ux-topo :links="links"
               node-clz="item">
        <div class="item"
             :key="item.id"
             v-for="item in list"
             :id="item.id">{{item.name}}</div>
      </ux-topo>
    </div>
    <div slot="desc">通过
      <code>links</code>指定节点之间的关系，可以通过鼠标拖拽或者滚动移动整个画布，也可以拖拽单个节点。按住
      <code>Ctrl</code>键滚动鼠标可以缩放拓扑图。</div>
    <ux-code slot="code">
      {{code}}
    </ux-code>
  </ux-demo>
</template>

<style lang="scss" scoped>
  .item {
    position: absolute;
    width: 100px;
    height: 60px;
    // background: #fff;
    border: 1px solid #ccc;
    line-height: 60px;
    text-align: center;
    border-radius: 3px;
    z-index: 10;
    cursor: pointer;

    .ux-layout-dark & {
      background: rgba(0, 0, 0, 0.2);
    }
  }
</style>


<script>
  import code from '@/code/topology/basic';

  export default {
    data() {
      return {
        list: [
          {
            id: 'b0',
            name: 'root',
          },
          {
            id: 'b1',
            name: 'JavaScript',
          },
          {
            id: 'b2',
            name: 'CSS',
          },
          {
            id: 'b3',
            name: 'html',
          },
          {
            id: 'b4',
            name: 'React',
          },
          {
            id: 'b5',
            name: 'Angular',
          },
          {
            id: 'b6',
            name: 'Vue',
          },
          {
            id: 'b7',
            name: 'Less',
          },
          {
            id: 'b8',
            name: 'Sass',
          },
          {
            id: 'b9',
            name: 'PostCSS',
          },
        ],
        links: [
          {
            from: 'b0',
            to: 'b1',
          },
          {
            from: 'b0',
            to: 'b2',
          },
          {
            from: 'b0',
            to: 'b3',
          },
          {
            from: 'b1',
            to: 'b4',
          },
          {
            from: 'b1',
            to: 'b5',
          },
          {
            from: 'b1',
            to: 'b6',
          },
          {
            from: 'b2',
            to: 'b7',
          },
          {
            from: 'b2',
            to: 'b8',
          },
          {
            from: 'b2',
            to: 'b9',
          },
        ],
        code,
      };
    },
  };
</script>
