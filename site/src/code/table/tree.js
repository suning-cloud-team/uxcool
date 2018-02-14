export default `
<template>
  <table class="ux-table ux-table-hover">
    <thead>
      <tr>
        <th>col 1</th>
        <th>col 2</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in flatList"
          :key="item.key"
          v-show="item.show">
        <td>
          <span class="indenter"
                :style="{marginLeft: \`$\{item.level * 20}px\`}">
            <span class="tree-icon">
              <span v-if="item.type === 'branch'">
                <ux-icon type="add"
                        v-if="!item.expanded"
                        @click="expand(item)"></ux-icon>
                <ux-icon type="minus"
                        v-if="item.expanded"
                        @click="collapse(item)"></ux-icon>
              </span>
            </span>
          </span>{{item.name}}</td>
        <td>column 2</td>
      </tr>
    </tbody>
  </table>
</template>

<style lang="scss" scoped>
  .indenter {
    margin-right: 10px;
  }

  .tree-icon {
    display: inline-block;
    width: 14px;
    line-height: 20px;

    i {
      cursor: pointer;
    }
  }
</style>

<script>
  function recursive(list, expanded, flag = false) {
    if (list && list.length) {
      list.forEach((v) => {
        const nv = v;
        nv.show = expanded;

        if (flag) {
          nv.expanded = expanded;
          recursive(nv.children, expanded, flag);
        }
      });
    }
  }

  export default {
    data() {
      return {
        list: [
          {
            key: 1,
            name: 'John Brown sr.',
            age: 60,
            address: 'New York No. 1 Lake Park',
            children: [
              {
                key: 11,
                name: 'John Brown',
                age: 42,
                address: 'New York No. 2 Lake Park',
              },
              {
                key: 12,
                name: 'John Brown jr.',
                age: 30,
                address: 'New York No. 3 Lake Park',
                children: [
                  {
                    key: 121,
                    name: 'Jimmy Brown',
                    age: 16,
                    address: 'New York No. 3 Lake Park',
                  },
                ],
              },
              {
                key: 13,
                name: 'Jim Green sr.',
                age: 72,
                address: 'London No. 1 Lake Park',
                children: [
                  {
                    key: 131,
                    name: 'Jim Green',
                    age: 42,
                    address: 'London No. 2 Lake Park',
                    children: [
                      {
                        key: 1311,
                        name: 'Jim Green jr.',
                        age: 25,
                        address: 'London No. 3 Lake Park',
                      },
                      {
                        key: 1312,
                        name: 'Jimmy Green sr.',
                        age: 18,
                        address: 'London No. 4 Lake Park',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
        flatList: [],
      };
    },
    watch: {
      list(n) {
        this.flatList = this.tree2Array(n);
      },
    },
    methods: {
      tree2Array(tree) {
        const result = [];
        const dfs = (list, level) =>
          list.map((v) => {
            const nv = v;

            const item = {
              ...nv,
              level,
              type: nv.children ? 'branch' : '',
              expanded: false,
              show: level === 0,
            };
            result.push(item);
            if (item.children && item.children.length) {
              item.children = dfs(item.children, level + 1);
            }

            return item;
          });
        dfs(tree, 0, []);

        return result;
      },

      expand(item) {
        const nItem = item;
        nItem.expanded = true;
        recursive(nItem.children, true);
      },
      collapse(item) {
        const nItem = item;
        nItem.expanded = false;
        recursive(nItem.children, false, true);
      },
    },
    mounted() {
      this.flatList = this.tree2Array(this.list);
    },
  };
`;
