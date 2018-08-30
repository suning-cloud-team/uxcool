<template>
  <ux-demo :height="200"
           title="自定义输入组件">
    <div slot="demo">
      <ux-auto-complete :data-source="dataSource"
                        :not-found-content="getNotFoundContent()"
                        size="large"
                        @search="onSearch"
                        @change="onChange"
                        @popup-visible-change="onPopupVisible"
                        @select="onSelect"
                        @deselect="onDeselect">
        <ux-textarea slot="renderInputElement"
                     :auto-size="{minRows: 3}"
                     class="custom-textarea"
                     style="height:50px" />
      </ux-auto-complete>
    </div>
    <div slot="desc">
      使用
      <code>slot=renderInputElement</code>自定义输入组件
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/auto-complete/custom.vue';

  export default {
    data() {
      return {
        code,
        isLoading: false,
        dataSource: [],
      };
    },
    methods: {
      getNotFoundContent() {
        return this.isLoading ? (
          <span>
            <ux-icon type="loading" />加载中
          </span>
        ) : null;
      },
      onSearch(searchValue) {
        this.isLoading = true;
        this.dataSource = [];
        setTimeout(() => {
          this.dataSource = searchValue
            ? [1, 2, 3].map(v => ({
              value: `${searchValue}`.repeat(v),
            }))
            : [];
          this.isLoading = false;
        }, 1500);
      },
      onChange(...args) {
        console.log('onChange', ...args);
      },
      onSelect(...args) {
        console.log('onSelect', ...args);
      },
      onDeselect(...args) {
        console.log('onDeselect', ...args);
      },
      onPopupVisible(...args) {
        console.log('onPopupVisible', ...args);
      },
    },
  };
</script>
