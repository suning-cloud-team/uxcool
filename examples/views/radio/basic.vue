<template>
  <div>
    <div class="demo">
      <h6>normal</h6>
      <ux-radio />
    </div>
    <div class="demo">
      <h6>inner label</h6>
      <ux-radio>inner label</ux-radio>
    </div>
    <div class="demo">
      <h6>autofocus</h6>
      <ux-radio label="label text"
                autofocus/>
    </div>
    <div class="demo">
      <h6>disabled</h6>
      <ux-radio disabled
                label="disabled" />
    </div>
    <div class="demo">
      <h6>toggle checked</h6>
      <ux-radio v-model="checked1"
                @change="onChangeChecked1" />
      <button class="ux-btn"
              @click="changeChecked1">changeChecked1</button>
    </div>
    <div class="demo">
      <h6>toggle disabled</h6>
      <ux-radio :disabled="tDisabled"
                label="disabled" />
      <ux-radio :disabled="tDisabled"
                checked
                label="disabled" />
      <button class="ux-btn"
              @click="toggleDisabled">toggle disabled</button>
    </div>
    <div>-------------group----------------</div>
    <div class="demo">
      <h6>normal group</h6>
      <ux-radio-group>
        <ux-radio value="1"
                  label="1" />
        <ux-radio value="2"
                  label="2" />
      </ux-radio-group>
    </div>

    <div class="demo">
      <h6>string options, defaultValue, change</h6>
      <ux-radio-group v-model="checkedOpts1"
                      :options="opts1"
                      @change="onOpts1Change" />
    </div>
    <div class="demo">
      <h6>object options</h6>
      <ux-radio-group :options="opts2" />
    </div>
    <div class="demo">
      <h6>only one disabled</h6>
      <ux-radio-group :options="opts3"
                      @change="onOpts1Change" />
    </div>
    <div class="demo">
      <h6>group disabled and only one undisabled</h6>
      <ux-radio-group disabled
                      :options="opts4"
                      @change="onOpts1Change" />
    </div>

    <div class="demo">
      <h6>group name</h6>
      <ux-radio-group name="a"
                      :options="opts5" />
    </div>
    <div class="demo">
      <h6>vertical</h6>
      <ux-radio-group class="radio-group-vertical"
                      :options="opts6" />

      <h6>vertical v-for more</h6>
      <ux-radio-group v-model="opts6Checked"
                      class="radio-group-vertical">
        <ux-radio v-for="(v,k) in opts6"
                  :key="k"
                  :label="v"
                  :value="v"
                  style="height:34px;line-height:34px" />
        <ux-radio value="more"
                  style="height:34px;line-height:34px">
          <span>more</span>
          <input v-if="opts6Checked === 'more'"
                 class="ux-input"
                 style="width:100px;margin-left:10px">
        </ux-radio>
      </ux-radio-group>
    </div>
    <div>------------button------------</div>
    <div class="demo">
      <h6>group</h6>
      <ux-radio-group>
        <ux-radio-button label="abc"
                         value="1" />
        <ux-radio-button label="ded"
                         value="2" />
        <ux-radio-button label="aaa"
                         value="3" />
      </ux-radio-group>
    </div>
    <div class="demo">
      <h6>option group</h6>
      <ux-radio-group type="button"
                      :options="opts2" />

    </div>
    <div class="demo">
      <h6>option group option disabled </h6>
      <ux-radio-group type="button"
                      :options="opts3" />

    </div>

    <div class="demo">
      <h6>option group disabled</h6>
      <ux-radio-group type="button"
                      disabled
                      :options="opts4" />
    </div>
    <div class="demo">
      <h6>option group disabled</h6>
      <ux-radio-group type="button"
                      name="button"
                      :options="opts2" />
    </div>

    <div class="demo">
      <h6>size</h6>
      <ux-radio-group type="button"
                      size="large"
                      :options="opts2" />
      <br>
      <br>
      <ux-radio-group type="button"
                      :options="opts2" />
      <br>
      <br>
      <ux-radio-group type="button"
                      size="small"
                      :options="opts2" />
    </div>
  </div>
</template>


<script>
  import '@suning/uxcool/src/components/radio/style/index.scss';
  import { UxRadio, UxRadioGroup, UxRadioButton } from '@suning/uxcool/src/components/radio/index';

  export default {
    components: {
      UxRadio,
      UxRadioGroup,
      UxRadioButton,
    },
    data() {
      return {
        tDisabled: true,
        checked1: false,
        checkedOpts1: 'c',
        opts1: ['a', 'b', 'c', 'd'],
        opts2: [{ label: '1', value: 'a1', checked: true }, 'b1', 'c1', '1'],
        opts3: [{ label: '1', value: 'a1' }, 'b1', 'c1', { label: '1', value: '1', disabled: true }],
        opts4: [
          { label: 'aa', value: 'a1' },
          'b1',
          'c1',
          { label: '1', value: 'd1', disabled: false },
        ],
        opts5: ['aa', 'bb', 'cc'],
        opts6: ['1', '2', '3'],
        opts6Checked: '',
      };
    },
    created() {
      setTimeout(() => {
        this.checkedOpts1 = 'e';
        setTimeout(() => {
          this.checkedOpts1 = 'd';
        }, 1500);
      }, 2500);
    },
    methods: {
      toggleDisabled() {
        this.tDisabled = !this.tDisabled;
      },
      changeChecked1() {
        this.checked1 = !this.checked1;
      },
      onChangeChecked1(e) {
        console.log('onChangeChecked1', e);
      },
      onOpts1Change(e, prevVal) {
        console.log('onOpts1Change1', e, prevVal);
      },
    },
  };
</script>

<style lang="scss" scoped>
  /* /deep/是 vue-loader使用的指令 https://vue-loader.vuejs.org/zh-cn/features/scoped-css.html */
  .radio-group-vertical {
    /deep/ .ux-radio-wrapper {
      display: block;
    }
  }
</style>
