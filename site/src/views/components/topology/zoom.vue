<template>
  <ux-demo title="缩放"
           vertical>
    <div slot="demo">
      <div style="margin-bottom: 10px">
        <button class="ux-btn ux-btn-square"
                @click="zoom(true)">
          <i class="fu fu-minus"></i>
        </button>
        <span class="rate">{{rate}}</span>
        <button class="ux-btn ux-btn-square"
                @click="zoom(false)">
          <i class="fu fu-add"></i>
        </button>
      </div>
      <ux-topo :links="links"
               node-clz="item"
               ref="topo"
               @on-zoom-change="onZoomChange">
        <div class="item"
             :key="item.id"
             v-for="item in list"
             :id="item.id">{{item.name}}</div>
      </ux-topo>
    </div>
    <div slot="desc">可以通过组件实例调用panzoom方法。</div>
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
    background: #fff;
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

  .rate {
    display: inline-block;
    width: 50px;
    text-align: center;
  }
</style>


<script>
  import code from '@/code/topology/zoom';

  export default {
    data() {
      return {
        list: [
          {
            id: 'z0',
            name: 'node 0',
          },
          {
            id: 'z1',
            name: 'node 1',
          },
        ],
        links: [
          {
            from: 'z0',
            to: 'z1',
          },
        ],
        scale: 1,
        code,
      };
    },
    computed: {
      rate() {
        const percentage = Math.round(this.scale * 100);
        return `${percentage}%`;
      },
    },
    methods: {
      zoom(out) {
        this.$refs.topo.panzoom('zoom', out);
      },
      onZoomChange(scale) {
        this.scale = scale;
      },
    },
  };
</script>
