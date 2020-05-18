<template>
  <div class="demo">
    <h4>custom</h4>
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
</template>


<script>
  import { AutoComplete, Input, Icon } from '@cloud-sn/uxcool';

  export default {
    components: {
      UxAutoComplete: AutoComplete,
      UxTextarea: Input.Textarea,
      UxIcon: Icon,
    },
    data() {
      return {
        isLoading: false,
        dataSource: [],
      };
    },
    methods: {
      getNotFoundContent() {
        return this.isLoading ? (
          <span>
            <ux-icon type="loading" />
            加载中
          </span>
        ) : null;
      },
      onSearch(searchValue) {
        this.isLoading = true;
        this.dataSource = [];
        setTimeout(() => {
          this.dataSource = searchValue
            ? [1, 2, 3].map((v) => ({
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
