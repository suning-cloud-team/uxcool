<template>
  <div class="ux-topo-container">
    <div class="ux-topo-panzoom"
         ref="panzoom">
      <div class="ux-topo-diagram"
           ref="diagram">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery';
  import Dagre from 'dagre';
  import { jsPlumb } from 'jsplumb';
  // 修改了源码,增加ignoreChildrensEvents配置，详见https://github.com/YuriGor/jquery.panzoom/tree/ignoreChildrensEvents
  import './jquery.panzoom';

  /**
           *  大致思路：先让浏览器渲染节点元素，再将节点尺寸信息、连线信息传给dagre计算布局，重新设置节点位置，最后使用jsPlumb连接节点，使用panzoom插件实现缩放拖拽画布功能。
           */
  export default {
    name: 'Topo',
    props: {
      links: Array,
      zoomable: {
        type: Boolean,
        default: true,
      },
      nodeClz: {
        type: String,
        default: 'ux-topo-node',
      },
      jsPlumbOption: {
        type: Object,
        default() {
          return {};
        },
      },
      graphOption: {
        type: Object,
        default() {
          return {};
        },
      },
      panIgnoreChildrensEvents: {
        type: Boolean,
        default: true,
      },
      minScale: {
        type: Number,
        default: 0.4,
      },
      maxScale: {
        type: Number,
        default: 2,
      },
      incScale: {
        type: Number,
        default: 0.1,
      },
    },
    data() {
      return {
        instance: null,
        graphHeight: 0,
        plumbOption: Object.assign(
          {
            Anchors: [['Left', 'Right'], ['Left', 'Right']],
            Connector: [
              'Flowchart',
              {
                cornerRadius: 3,
                stub: 50,
              },
            ],
            Endpoints: ['Blank', 'Blank'],
            Overlays: [
              [
                'Arrow',
                {
                  location: 1,
                  width: 10,
                  length: 10,
                },
              ],
            ],
          },
          this.jsPlumbOption
        ),
        dgOption: Object.assign(
          {
            rankdir: 'LR', // 节点层级方向
            align: 'UL', // 节点布局
            nodesep: 30, // 节点与节点之间的
            ranksep: 100, // 层级之间间隔
            marginx: 50, // 左右距离画布边缘距离
            marginy: 50, // 上下距离画布边缘距离
          },
          this.graphOption
        ),
      };
    },
    watch: {
      links(n) {
        if (this.instance) {
          this.instance.deleteEveryEndpoint();
        }

        this.$nextTick(() => {
          this.render(n).then((plumb) => {
            this.instance = plumb;
          });
        });
      },
    },
    methods: {
      render(links) {
        const $container = $(this.$el);
        const $panzoom = $(this.$refs.panzoom);
        const $nodes = $container.find(`.${this.nodeClz}`);

        // 指定当前实例的容器
        this.plumbOption.Container = this.$refs.diagram;

        return new Promise((resolve) => {
          jsPlumb.ready(() => {
            const nodeSet = new Set();
            const dg = new Dagre.graphlib.Graph();
            dg.setGraph(this.dgOption);
            dg.setDefaultEdgeLabel(() => ({}));

            // 如果已经初始化过则复用旧实例，不然当links发生变化时,变化前存在的节点拖拽时连线不会跟着动
            const plumb = this.instance ? this.instance : jsPlumb.getInstance(this.plumbOption);

            (links || []).forEach(({
              from, to, nested, minlen = 1
            }) => {
              const connection = {
                source: from,
                target: to,
              };

              // TODO 这边嵌套节点还没试过怎么用，不知道该如何将这块设置暴露出去才合适
              if (nested) {
                connection.anchors = ['Bottom', 'Left'];
              }
              plumb.connect(connection).setVisible(false);
              nodeSet.add(from).add(to);

              dg.setEdge(from, to, {
                minlen,
              });
            });

            nodeSet.forEach((n) => {
              plumb.draggable(n);
            });

            $nodes.each((i, node) => {
              const $node = $(node);
              dg.setNode($node.attr('id'), {
                width: Math.round($node.outerWidth()),
                height: Math.round($node.outerHeight()),
              });
            });

            Dagre.layout(dg);

            dg.nodes().forEach((id) => {
              const {
                width, height, x, y
              } = dg.node(id);
              const top = Math.round(y - height / 2);
              const left = Math.round(x - width / 2);

              $(`#${id}`).css({
                position: 'absolute',
                left: `${left}px`,
                top: `${top}px`,
              });
            });

            setTimeout(() => {
              plumb.repaintEverything();
              plumb.getAllConnections().forEach((con) => {
                con.setVisible(true);
              });
              this.graphHeight = dg.graph().height;
              $nodes.css('opacity', 1);
            });

            // 防止多次绑定事件
            if (!this.instance) {
              plumb.bind('zoom', (scale) => {
                this.graphHeight = dg.graph().height * scale;
              });

              $panzoom
                .css({
                  'user-select': 'none',
                })
                .panzoom({
                  minScale: this.minScale,
                  maxScale: this.maxScale,
                  increment: this.incScale,
                  ignoreChildrensEvents: this.panIgnoreChildrensEvents,
                  cursor: '',
                })
                .on('panzoomzoom', (...args) => {
                  const scale = Math.round(args[2] * 10) / 10;
                  // 通知jsPlumb设置缩放，好触发zoom事件
                  plumb.setZoom(scale);

                  console.log('topo panzoomzoom', scale);
                  this.$emit('on-zoom-change', scale);
                })
                .on('panzoomstart', () => {
                  $panzoom.css('cursor', 'move');
                })
                .on('panzoomend', () => {
                  $panzoom.css('cursor', '');
                });

              $container
                .on('mousewheel.focal', (e) => {
                  e.preventDefault();

                  if (e.ctrlKey || e.originalEvent.ctrlKey) {
                    // 按住ctrl键滚动鼠标为缩放
                    if (this.zoomable) {
                      const delta = e.delta || e.originalEvent.wheelDelta;
                      const zoomOut = delta ? delta < 0 : e.originalEvent.deltaY > 0;
                      $panzoom.panzoom('zoom', zoomOut, {
                        animate: true,
                        exponential: false,
                      });
                    }
                  } else {
                    // 否则为移动
                    const dy = Number($panzoom.panzoom('getMatrix')[5]);
                    const deltaX = e.deltaX || e.originalEvent.wheelDeltaX || -e.originalEvent.deltaX;
                    let deltaY = e.deltaY || e.originalEvent.wheelDeltaY || -e.originalEvent.deltaY;

                    deltaY =
                      (deltaY < 0 && dy < this.graphHeight * -1 + 120) || (deltaY > 0 && dy > -60)
                        ? 0
                        : deltaY;

                    $panzoom.panzoom('pan', deltaX / 2, deltaY / 2, {
                      animate: true,
                      relative: true,
                    });
                  }
                })
                .on('mousedown', (e) => {
                  const matrix = $panzoom.panzoom('getMatrix');

                  $container.data('dragstart', {
                    x: e.pageX,
                    y: e.pageY,
                    dx: matrix[4],
                    dy: matrix[5],
                  });
                  $container.css('cursor', 'move');
                })
                .on('mousemove', (e) => {
                  const dragstart = $container.data('dragstart');

                  if (dragstart) {
                    const matrix = $panzoom.panzoom('getMatrix');
                    const deltaX = dragstart.x - e.pageX;
                    const deltaY = dragstart.y - e.pageY;
                    matrix[4] = parseInt(dragstart.dx, 10) - deltaX;
                    matrix[5] = parseInt(dragstart.dy, 10) - deltaY;
                    $panzoom.panzoom('setMatrix', matrix);
                  }
                });

              $container.add(document).on('mouseup', () => {
                $container.data('dragstart', null);
                $container.css('cursor', '');
              });
            }

            resolve(plumb);
          });
        });
      },
      panzoom(name, ...args) {
        return $(this.$refs.panzoom).panzoom(name, ...args);
      },
      destroy() {
        this.panzoom('destroy');
        this.plumb = null;
      },
    },
    mounted() {
      this.$nextTick(() => {
        this.render(this.links).then((plumb) => {
          this.instance = plumb;
        });
      });
    },
  };
</script>
