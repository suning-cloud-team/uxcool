<template>
  <div>
    <button class="ux-btn"
            @click="changeTheme">{{theme}}</button>

    <div class="demo">
      <h4>single custom filterOption</h4>
      <ux-select :filter-option="filterOption"
                 style="width:200px;"
                 show-search
                 :theme="theme">
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
      <ux-select :theme="theme"
                 :filter-option="filterOption"
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
      <ux-select style="width:200px;"
                 :theme="theme">
        <ux-option value="A">A</ux-option>
        <ux-option value="B">B</ux-option>
        <ux-option value="C">C</ux-option>
      </ux-select>

      <ux-select style="width:200px;"
                 disabled
                 :theme="theme">
        <ux-option value="A">A</ux-option>
        <ux-option value="B">B</ux-option>
        <ux-option value="C">C</ux-option>
      </ux-select>
    </div>

    <div class="demo">
      <ux-select style="width:200px;"
                 show-search
                 :theme="theme">
        <ux-option value="A">A</ux-option>
        <ux-option value="B">B</ux-option>
        <ux-option value="C">C</ux-option>
      </ux-select>
    </div>

    <div class="demo">
      <ux-select style="width:200px;"
                 mode="multiple"
                 allow-clear
                 :theme="theme">
        <ux-option value="A"
                   label="A10">A10</ux-option>
        <ux-option value="B">B</ux-option>
        <ux-option value="C">C</ux-option>
      </ux-select>
      <ux-select allow-clear
                 disabled
                 mode="multiple"
                 :theme="theme"
                 style="width:200px;margin-left:200px;">
        <ux-option value="A">A</ux-option>
        <ux-option value="B">B</ux-option>
        <ux-option value="C">C</ux-option>
      </ux-select>
    </div>

    <div class="demo">
      <ux-select allow-clear
                 :theme="theme"
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
    <div class="demo"
         ref="selectContainerRef">
      <ux-select :theme="theme"
                 :get-container="getContainer"
                 mode="multiple"
                 style="width:200px;margin-left:200px;">
        <ux-option value="A">A</ux-option>
        <ux-option value="B">B</ux-option>
        <ux-option value="C">C</ux-option>
      </ux-select>
    </div>

    <async-demo />
    <number-demo />
  </div>
</template>

<script>
  import { Select } from '@suning/uxcool';
  import AsyncDemo from './async.vue';
  import NumberDemo from './number.vue';

  export default {
    components: {
      UxSelect: Select,
      UxOption: Select.Option,
      UxOptionGroup: Select.Group,
      AsyncDemo,
      NumberDemo,
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
