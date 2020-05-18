<template>

  <div class="demo">
    <h4>async rebuild</h4>
    <ux-search-input placeholder="Search"
                     @search="onSearch" />
    <ux-tree ref="tree"
             :load-data="loadTreeData"
             lazy />

  </div>
</template>


<script>
  import { Tree, Input } from '@cloud-sn/uxcool';

  export default {
    components: {
      UxSearchInput: Input.Search,
      UxTree: Tree.VirtualTree,
    },
    data() {
      return {};
    },
    methods: {
      loadTreeData(node) {
        return new Promise((resolve) => {
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
