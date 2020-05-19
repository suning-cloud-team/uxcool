<template>
  <div>
    <div class="demo">
      <ux-search-input v-model="inputVal"
                       allow-clear
                       autofocus
                       @click="onClick"
                       @search="onSearch"
                       @change="onChange"
                       @pressenter="onPressenter" />
      inputVal: {{inputVal}}
    </div>
    <h4>enter-button = true</h4>
    <div class="demo">
      <ux-search-input :enter-button="true"
                       @search="onSearch" />
    </div>

    <h4>enter-button = String</h4>
    <div class="demo">
      <ux-search-input enter-button="Search"
                       @search="onSearch" />
    </div>

    <h4>custom-search-icon</h4>
    <div class="demo">
      <ux-search-input :enter-button="customIcon"
                       @search="onSearch" />
    </div>

    <h4>disabled</h4>
    <div class="demo">
      <ux-search-input disabled
                       @search="onSearch" />
      <ux-search-input disabled
                       :enter-button="true"
                       @search="onSearch" />
    </div>
    <h4>size</h4>
    <div class="demo">
      <ux-search-input size="large" />
      <ux-search-input size="large"
                       :enter-button="true" />
      <ux-search-input />
      <ux-search-input :enter-button="true" />
      <ux-search-input size="small" />
      <ux-search-input size="small"
                       :enter-button="true" />
    </div>

    <h4>slots</h4>
    <div class="demo">
      <ux-search-input>
        <ux-icon slot="prefix"
                 type="account" />
      </ux-search-input>
      <ux-search-input>
        <ux-icon slot="prefix"
                 type="account" />
      </ux-search-input>
      <ux-search-input addon-before="http://"
                       addon-after=".com" />

      <ux-search-input enter-button="search"
                       addon-before="http://"
                       addon-after=".com" />
      <ux-search-input>
        <ux-select slot="addonBefore"
                   value="http://"
                   style="width:90px">
          <ux-option value="http://">http://</ux-option>
          <ux-option value="https://">https://</ux-option>
          <ux-option value="ftp://">ftp://</ux-option>
        </ux-select>

        <ux-select slot="addonAfter"
                   value=".edu"
                   style="width:80px">
          <ux-option value=".com">.com</ux-option>
          <ux-option value=".org.org.org.org.org.org">.org.org.org.org.org.org</ux-option>
          <ux-option value=".edu">.edu</ux-option>
          <ux-option value=".cn">.cn</ux-option>
        </ux-select>
      </ux-search-input>

    </div>
  </div>
</template>

<script>
  import { Input, Icon, Select } from '@cloud-sn/uxcool';

  export default {
    components: {
      UxSearchInput: Input.Search,
      UxIcon: Icon,
      UxSelect: Select,
      UxOption: Select.Option,
    },
    data() {
      return {
        inputVal: null,
      };
    },
    methods: {
      customIcon() {
        return <Icon type="order-search-d" />;
      },
      onClick(e) {
        console.log('click', e);
      },
      onPressenter(e) {
        console.log('pressenter', e);
      },
      onChange(e) {
        console.log('onChange', e);
      },
      onSearch(e) {
        console.log('onSearch', e);
      },
    },
  };
</script>
