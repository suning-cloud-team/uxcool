<template>
  <div>
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
    <br>
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
