<template>
  <ux-demo title="异步加载数据"
           vertical>
    <div slot="demo">
      <div style="margin-bottom: 10px">
        <button class="ux-btn ux-btn-primary"
                @click="mockData">mock data</button>
      </div>
      <ux-topo :links="links"
               node-clz="item">
        <div class="item"
             :key="item.id"
             v-for="item in list"
             :id="item.id">{{item.name}}</div>
      </ux-topo>
    </div>
    <div slot="desc"></div>
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
  import code from '@/code/topology/async';

  export default {
    data() {
      return {
        list: [
          {
            id: 'a0',
            name: 'node 0',
          },
          {
            id: 'a1',
            name: 'node 1',
          },
        ],
        links: [
          {
            from: 'a0',
            to: 'a1',
          },
        ],
        code,
      };
    },
    methods: {
      mockData() {
        const nodeCount = Math.round(Math.random() * 5) + 5;

        this.list = Array.from({ length: nodeCount }).map((item, i) => ({
          id: `a${i}`,
          name: `node ${i}`,
        }));

        this.links = [];

        for (let i = 0; i < nodeCount; i++) {
          let index = Math.floor(Math.random() * nodeCount);

          while (i == index) {
            index = Math.floor(Math.random() * nodeCount);
          }

          this.links.push({
            from: `a${i}`,
            to: `a${index}`,
          });
        }
      },
    },
  };
</script>
