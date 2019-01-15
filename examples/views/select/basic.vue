<template>
  <div>

    <div class="demo">
      <h4>single custom filterOption</h4>
      <ux-select :filter-option="filterOption"
                 style="width:200px;"
                 show-search>
        <ux-option value="A"
                   label="A1" />
        <ux-option value="B"
                   label="B2" />
        <ux-option value="C"
                   label="C3" />
      </ux-select>
    </div>
    <div class="demo">
      <h4>mode="multiple" custom filterOption</h4>
      <ux-select :filter-option="filterOption"
                 style="width:200px;"
                 show-search
                 mode="multiple">
        <ux-option value="A"
                   label="A1" />
        <ux-option value="B"
                   label="B2" />
        <ux-option value="C"
                   label="C3" />
      </ux-select>
    </div>
    <div class="demo">
      <h4>children label</h4>
      <ux-select style="width:200px;"
                 option-label-prop="children">
        <ux-option value="A">A</ux-option>
        <ux-option value="B">B</ux-option>
        <ux-option value="C">C</ux-option>
      </ux-select>

      <ux-select style="width:200px;"
                 disabled>
        <ux-option value="A">A</ux-option>
        <ux-option value="B">B</ux-option>
        <ux-option value="C">C</ux-option>
      </ux-select>
    </div>

    <div class="demo">
      <ux-select style="width:200px;"
                 option-label-prop="children"
                 show-search>
        <ux-option value="A">A1</ux-option>
        <ux-option value="B">B2</ux-option>
        <ux-option value="C">C3</ux-option>
      </ux-select>
    </div>

    <div class="demo">
      <h4>multiple </h4>
      <ux-select :value="''"
                 style="width:200px;"
                 mode="multiple"
                 allow-clear>
        <ux-option value="A"
                   label="A10">A10</ux-option>
        <ux-option value="B">B</ux-option>
        <ux-option value="C">C</ux-option>
      </ux-select>
      <ux-select allow-clear
                 disabled
                 mode="multiple"
                 style="width:200px;margin-left:200px;">
        <ux-option value="A">A</ux-option>
        <ux-option value="B">B</ux-option>
        <ux-option value="C">C</ux-option>
      </ux-select>
    </div>

    <div class="demo">
      <ux-select allow-clear
                 style="width:200px;margin-left:200px;">
        <ux-option value="A">A</ux-option>
        <ux-option value="B"
                   disabled>B</ux-option>
        <ux-option value="C">C</ux-option>
      </ux-select>
    </div>
    <div class="demo">
      <ux-select :theme="theme"
                 allow-clear
                 mode="multiple"
                 style="width:200px;margin-left:200px;">
        <ux-option value="A">A</ux-option>
        <ux-option value="B"
                   disabled>B</ux-option>
        <ux-option value="C">C</ux-option>
      </ux-select>
    </div>

    <div class="demo">
      <ux-select :theme="theme"
                 allow-clear
                 disabled
                 mode="multiple"
                 style="width:200px;margin-left:200px;">
        <ux-option value="A">A</ux-option>
        <ux-option value="B">B</ux-option>
        <ux-option value="C">C</ux-option>
      </ux-select>
    </div>

    <h4>getContainer</h4>
    <div ref="selectContainerRef"
         class="demo">
      <ux-select :theme="theme"
                 :get-container="getContainer"
                 mode="multiple"
                 style="width:200px;margin-left:200px;">
        <ux-option value="A">A</ux-option>
        <ux-option value="B">B</ux-option>
        <ux-option value="C">C</ux-option>
      </ux-select>
    </div>
    <single-demo />
    <async-demo />
    <number-demo />
    <disabled-demo />
    <number-demo />
    <group-demo />
    <show-demo />
    <multiple-demo />
    <tags-demo />
    <combobox-demo />
    <huge-demo />
    <max-tags-demo />
    <remote-filter-demo />
    <custom-input-demo />
    <custom-attrs-demo />
    <clear-demo />
    <disabled-demo />
    <extra-demo />
    <search-demo />
  </div>
</template>

<script>
  import { Select } from '@suning/uxcool';
  import AsyncDemo from './async.vue';
  import NumberDemo from './number.vue';
  import DisabledDemo from './disabled.vue';
  import GroupDemo from './group.vue';
  import ShowDemo from './show.vue';
  import MultipleDemo from './multiple.vue';
  import TagsDemo from './tags.vue';
  import ComboboxDemo from './combobox.vue';
  import HugeDemo from './huge.vue';
  import MaxTagsDemo from './maxTags.vue';
  import SingleDemo from './single.vue';
  import RemoteFilterDemo from './remoteFilter.vue';
  import CustomInputDemo from './custom-input.vue';
  import CustomAttrsDemo from './custom-attrs.vue';
  import ClearDemo from './clear.vue';
  import ExtraDemo from './extra.vue';
  import SearchDemo from './search.vue';

  export default {
    components: {
      UxSelect: Select,
      UxOption: Select.Option,
      UxOptionGroup: Select.Group,
      AsyncDemo,
      NumberDemo,
      DisabledDemo,
      GroupDemo,
      ShowDemo,
      MultipleDemo,
      TagsDemo,
      ComboboxDemo,
      HugeDemo,
      MaxTagsDemo,
      SingleDemo,
      RemoteFilterDemo,
      CustomInputDemo,
      CustomAttrsDemo,
      ClearDemo,
      ExtraDemo,
      SearchDemo,
    },
    data() {
      return {
        theme: 'light',
        // options: Array(1000)
        //   .fill(0)
        //   .map((v, i) => ({ value: i, label: `label-${i}` })),
      };
    },
    methods: {
      filterOption(input, option) {
        return option.label.indexOf(input) > -1;
      },
      changeTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
      },
      getContainer() {
        return this.$refs.selectContainerRef;
      },
    },
  };
</script>
