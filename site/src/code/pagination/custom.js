export default `
<template>
  <ux-pagination 
    :total="500"
    :show-before-total="showBeforeTotal"
    @change="paginationChange">
  </ux-pagination>
</template>
<script>
  export default {
    methods: {
      paginationChange(p) {
        console.log(p);
        this.current = p;
      },
      showBeforeTotal(total, pageSize, totalPage, pageNo, range) {
        return \`共\${total}条, 每页显示\${pageSize}条, \${range[0]}-\${range[1]} / \${total}条, 共\${
          totalPage
        }页\`;
      },
    },
  };
</script>
`;
