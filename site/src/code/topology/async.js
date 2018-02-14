export default `
<template>
  <div style="margin-bottom: 10px">
    <button class="ux-btn ux-btn-primary" @click="mockData">mock data</button>
  </div>
  <ux-topo :links="links" node-clz="item">
    <div class="item" :key="item.id" v-for="item in list" :id="item.id">{{item.name}}</div>
  </ux-topo>
</template>

<style lang="scss" scoped>
  .item {
    position: absolute;
    width: 100px;
    height: 60px;
    background: #FFF;
    border: 1px solid #CCC;
    line-height: 60px;
    text-align: center;
    border-radius: 3px;
    z-index: 10;
    cursor: pointer;
  }
</style>


<script>
export default {
  data() {
    return {
      list: [
        {
          id: 'a0',
          name: 'node 0'
        },
        {
          id: 'a1',
          name: 'node 1'
        }
      ],
      links: [
        {
          from: 'a0',
          to: 'a1'
        }
      ]
    }
  },
  methods: {
    mockData() {
      const nodeCount = Math.round(Math.random() * 5) + 5;

      this.list = Array.from({length: nodeCount}).map((item, i) => {
        return {
          id: \`a\${i}\`,
          name: \`node \${i}\`
        };
      });

      this.links = [];

      for (let i = 0; i < nodeCount; i++) {
        let index = Math.floor(Math.random() * nodeCount);

        while(i == index) {
          index = Math.floor(Math.random() * nodeCount);
        }

        this.links.push({
          from: \`a\${i}\`,
          to: \`a\${index}\`
        })
      }
    }
  }
}
</script>
`;
