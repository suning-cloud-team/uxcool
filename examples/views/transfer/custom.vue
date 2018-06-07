<template>
  <div class="demo">
    <h4>custom</h4>
    <p>当使用`lazy`模式时无法使用`list-style`设置`height`,需要通过`lazy`的`remain`属性设置保留行数,来撑开高度</p>
    <ux-transfer :data-source="dataSource"
                 :target-keys="targetKeys"
                 :titles="titles"
                 :list-style="listStyle"
                 :lazy="lazy"
                 row-key="id"
                 show-search
                 search-placeholder="Search Input"
                 not-found-content="Not Found">
      <ux-button slot="leftFooter"
                 size="small"
                 style="float:right;margin:5px">Left Operator</ux-button>
      <ux-button slot="rightFooter"
                 size="small"
                 style="float:right;margin:5px">Right Operator</ux-button>
    </ux-transfer>

    <p>也可设置`lazy=false`关闭`lazy`模式, 此时可通过`list-style`设置`height`</p>
    <ux-transfer :data-source="dataSource"
                 :target-keys="targetKeys"
                 :list-style="{width:'300px', height:'350px'}"
                 :lazy="false"
                 row-key="id">
      <ux-button slot="leftFooter"
                 size="small"
                 style="float:right;margin:5px">Left Operator</ux-button>
      <ux-button slot="rightFooter"
                 size="small"
                 style="float:right;margin:5px">Right Operator</ux-button>
    </ux-transfer>
  </div>
</template>

<script>
  import { Transfer, Button } from '@suning/uxcool';

  function mockData(cnt = 10) {
    return Array(cnt)
      .fill(0)
      .map((v, i) => ({
        id: i,
        title: `title-${i}`,
        label: `label-${i}`,
        // disabled: i % 3 === 0,
    }));
  }
  export default {
    components: {
      UxTransfer: Transfer,
      UxButton: Button,
    },
    data() {
      return {
        listStyle: {
          width: '300px',
        },
        lazy: {
          remain: 10,
        },
        dataSource: mockData(20),
        targetKeys: [0, 2, 5],
        titles: ['Source', 'Target'],
      };
    },
  };
</script>
