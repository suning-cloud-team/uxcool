<template>
  <ux-demo :height="200"
           title="异步加载树重置">
    <div slot="demo">
      <ux-search-input placeholder="Search"
                       @search="onSearch" />
      <ux-tree ref="tree"
               :load-data="loadData"
               lazy />
    </div>
    <div slot="desc">
      对于全量加载树节点的场景，可以通过<code>data-source</code>属性重置整棵树；对于懒加载模式，可以通过实例方法<code>rebuildAsyncTree</code>重置。
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/tree/async-rebuild.vue';

  export default {
    data() {
      return {
        code,
      };
    },
    methods: {
      loadData(node) {
        return new Promise(resolve => {
          // 初始时加载数据
          if (!node) {
            resolve([
              {
                key: 'a',
                title: 'a',
              },
              {
                key: 'b',
                title: 'b',
              },
              {
                key: 'c',
                title: 'c',
              },
            ]);
          } else {
            // node存在，由点击展开按钮触发加载动作
            const { key, title } = node;
            // 模拟异步请求获取数据
            const data = Array.from({ length: 3 }, (_, i) => ({
              key: `${key}-${i}`,
              title: `${title}-${i}`,
              isLeaf: Math.random() > 0.5,
            }));
            setTimeout(() => {
              resolve(data);
            }, 1000);
          }
        });
      },
      onSearch(val) {
        // 模拟根据关键字搜索数据
        let keyword = '';
        if (val) {
          keyword = val
            .trim()
            .replace(/\s+/g, '-')
            .replace(/-+$/, '');
          keyword = `${keyword}-`;
        }
        const data = Array.from({ length: 4 }, (_, i) => ({
          key: `${keyword}${i}`,
          title: `${keyword}${i}`,
        }));
        // 重置树
        this.$refs.tree.rebuildAsyncTree(data);
      },
    },
  };
</script>
