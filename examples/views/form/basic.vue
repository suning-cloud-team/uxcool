<template>
  <form class="ux-form ux-form-horizontal ux-advanced-search-form">
    <ux-row :gutter="12">
      <ux-col :span="8">
        <ux-row class="ux-form-item">
          <div class="ux-form-item-label">
            <label for="field-0"
                   title="Field 0">Field 0 </label>
          </div>
          <div class="ux-form-item-control-wrapper">
            <div class="ux-form-item-control">
              <span class="ux-form-item-children">
                <input placeholder="placeholder"
                       type="text"
                       id="field-0"
                       class="ux-input"
                       value="">
              </span>
            </div>
          </div>
        </ux-row>
      </ux-col>
      <ux-col :span="8">
        <ux-row class="ux-form-item">
          <div class="ux-form-item-label">
            <label for="field-0"
                   title="Field 0">Field 1 </label>
          </div>
          <div class="ux-form-item-control-wrapper">
            <div class="ux-form-item-control">
              <span class="ux-form-item-children">
                <input placeholder="placeholder"
                       type="text"
                       id="field-0"
                       class="ux-input"
                       value="">
              </span>
            </div>
          </div>
        </ux-row>
      </ux-col>
      <ux-col :span="8">
        <ux-row class="ux-form-item">
          <div class="ux-form-item-label">
            <label for="field-0"
                   title="Field 0">Field 2 </label>
          </div>
          <div class="ux-form-item-control-wrapper">
            <div class="ux-form-item-control">
              <span class="ux-form-item-children">
                <input placeholder="placeholder"
                       type="text"
                       id="field-0"
                       class="ux-input"
                       value="">
              </span>
            </div>
          </div>
        </ux-row>
      </ux-col>
      <ux-col :span="8">
        <ux-row class="ux-form-item">
          <div class="ux-form-item-label">
            <label for="field-0"
                   title="Field 0">Field 3 </label>
          </div>
          <div class="ux-form-item-control-wrapper">
            <div class="ux-form-item-control">
              <span class="ux-form-item-children">
                <input placeholder="placeholder"
                       type="text"
                       id="field-0"
                       class="ux-input"
                       value="">
              </span>
            </div>
          </div>
        </ux-row>
      </ux-col>
      <ux-col :span="8">
        <ux-row class="ux-form-item">
          <div class="ux-form-item-label">
            <label for="field-0"
                   title="Field 0">Field 4 </label>
          </div>
          <div class="ux-form-item-control-wrapper">
            <div class="ux-form-item-control">
              <span class="ux-form-item-children">
                <input placeholder="placeholder"
                       type="text"
                       id="field-0"
                       class="ux-input"
                       value="">
              </span>
            </div>
          </div>
        </ux-row>
      </ux-col>
    </ux-row>
  </form>
</template>

<script>
  import { Grid, Form } from '@suning/uxcool';

  export default {
    components: {
      UxForm: Form,
      UxRow: Grid,
      UxCol: Grid.Col,
    },
  };
</script>

<style>
  .ux-advanced-search-form .ux-form-item {
    display: flex;
  }

  .ux-advanced-search-form .ux-form-item-control-wrapper {
    flex: 1;
  }
</style>
