<template>
  <div class="demo">
    <h4>disabled</h4>
    <ux-auto-complete :data-source="dataSource"
                      disabled
                      @search="onSearch">
      <ux-textarea slot="renderInputElement"
                   :auto-size="{minRows: 3}"
                   style="height:50px" />
    </ux-auto-complete>
  </div>
</template>


<script>
  import { AutoComplete, Input } from '@suning/uxcool';

  export default {
    components: {
      UxAutoComplete: AutoComplete,
      UxTextarea: Input.Textarea,
    },
    data() {
      return {
        dataSource: [],
      };
    },
    methods: {
      onSearch(searchValue) {
        this.dataSource = searchValue
          ? [1, 2, 3].map(v => ({
            value: `${searchValue}`.repeat(v),
          }))
          : [];
      },
    },
  };
</script>
