<template>
  <div>

    <div class="demo">
      <ux-input v-model="inputVal1"
                autofocus
                id="abc"
                placeholder="input1" />
    </div>
    <div class="demo">
      <h4>number</h4>
      <ux-input v-model="inputValN"
                autofocus
                id="abc"
                placeholder="input1" />
    </div>
    <div class="demo">
      <ux-input disabled
                autofocus
                id="abc"
                style="color:red"
                placeholder="input11" />
    </div>

    <div class="demo">
      <ux-input v-model="inputVal2"
                name="input2"
                id="id2"
                style="color:red"
                placeholder="input2">
        <ux-icon slot="prefix"
                 type="account_more" />
      </ux-input>
    </div>

    <div class="demo">
      <ux-input v-model="input3"
                v-bind="attrs"
                placeholder="input3"
                @input="onInput"
                @change="onChange"
                @click="onClick"
                @keyup="onKeyup"
                @pressenter="onPressenter"
                @keydown="onKeydown"
                @focus="onFocus"
                @blur="onBlur" />
    </div>

    <h4>addon</h4>
    <div class="demo">
      <ux-input allow-clear
                addon-before="http://"
                addon-after=".com" />
    </div>

    <div class="demo">
      <ux-input allow-clear
                size="large">
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
      </ux-input>

    </div>

    <div class="demo">
      <ux-input>
        <ux-icon slot="addonAfter"
                 type="regulation" />
      </ux-input>
    </div>

    <h4>show word limit</h4>
    <div class="demo">
      <ux-input allow-clear
                show-word-limit
                maxlength="20"
                v-model="inputVal1" />
      <ux-textarea show-word-limit
                   maxlength="20"
                   v-model="inputVal1" />
    </div>

    <h4>clear value</h4>
    <div class="demo">
      <ux-input v-model="clearInput"
                allow-clear />

      <ux-input v-model="clearInput"
                allow-clear>
        <ux-icon slot="prefix"
                 type="account_more" />
        <ux-icon slot="suffix"
                 type="close_circle" />
      </ux-input>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import { Input, Icon, Select, Tooltip } from '@suning/uxcool';

  export default {
    components: {
      UxInput: Input,
      UxIcon: Icon,
      UxSelect: Select,
      UxOption: Select.Option,
      UxTooltip: Tooltip,
      UxTextarea: Input.Textarea,
    },
    data() {
      return {
        inputValN: 2,
        inputVal1: 'abc',
        inputVal2: null,
        input3: null,
        clearInput: '',
        attrs: {
          spellcheck: false,
        },
      };
    },
    computed: mapState(['theme']),
    created() {
      setTimeout(() => {
        this.attrs = {
          autofocus: true,
        };
      }, 1500);
    },
    methods: {
      onInput(e) {
        console.log('input', e);
      },
      onClick(e) {
        console.log('click', e);
      },
      onKeyup(e) {
        console.log('keyup', e);
      },
      onChange(e) {
        console.log('change', e);
      },
      onPressenter(e) {
        console.log('pressenter', e);
      },
      onBlur(e) {
        console.log('onBlur', e);
      },
      onFocus(e) {
        console.log('focus', e);
      },
      onKeydown(e) {
        console.log('keydown', e);
      },
    },
  };
</script>
