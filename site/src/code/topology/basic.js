export default `
<template>
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
          id: 'b0',
          name: 'root'
        },
        {
          id: 'b1',
          name: 'JavaScript'
        },
        {
          id: 'b2',
          name:'CSS'
        },
        {
          id: 'b3',
          name: 'html'
        },
        {
          id: 'b4',
          name: 'React'
        },
        {
          id: 'b5',
          name: 'Angular'
        },
        {
          id: 'b6',
          name: 'Vue'
        },
        {
          id: 'b7',
          name: 'Less'
        },
        {
          id: 'b8',
          name: 'Sass'
        },
        {
          id: 'b9',
          name: 'PostCSS'
        },
      ],
      links: [
        {
          from: 'b0',
          to: 'b1'
        },
        {
          from: 'b0',
          to: 'b2'
        },
        {
          from: 'b0',
          to: 'b3'
        },
        {
          from: 'b1',
          to: 'b4'
        },
        {
          from: 'b1',
          to: 'b5'
        },
        {
          from: 'b1',
          to: 'b6'
        },
        {
          from: 'b2',
          to: 'b7'
        },
        {
          from: 'b2',
          to: 'b8'
        },
        {
          from: 'b2',
          to: 'b9'
        },
      ]
    }
  }
}
</script>
`;
