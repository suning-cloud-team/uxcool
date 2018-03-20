<template>
  <div>
    <div class="demo">
      <h6>normal</h6>
      <ux-checkbox />
    </div>
    <div class="demo">
      <h6>checked</h6>
      <ux-checkbox v-model="checked" />
    </div>
    <div class="demo">
      <h6>slot content</h6>
      <ux-checkbox v-model="checked">content</ux-checkbox>
    </div>
    <div class="demo">
      <h6>autofocus</h6>
      <ux-checkbox v-model="checked"
                   autofocus>
        <span>autofocus</span>
      </ux-checkbox>
    </div>
    <div class="demo">
      <h6>onChange</h6>
      <ux-checkbox v-model="checked"
                   @change="onChange">
        <span>change</span>
      </ux-checkbox>
    </div>
    <div class="demo">
      <h6>disabled</h6>
      <ux-checkbox v-model="disabledChecked"
                   disabled>disabled</ux-checkbox>
    </div>
    <div class="demo">
      <h6>label</h6>
      <ux-checkbox v-model="disabledChecked"
                   label="abc" />
    </div>

    <div class="demo">
      <h6>change checked and disabled</h6>
      <ux-checkbox v-model="cChecked"
                   :disabled="cDisabled">
        <span style="color: red">{{ cChecked ? 'checked' : 'unChecked' }}-{{ cDisabled ? 'disabled' : 'unDisabled' }}</span>
      </ux-checkbox>

      <button class="ux-btn"
              @click="changeCChecked">{{ cChecked ? 'unChecked' : 'checked' }}</button>
      <button class="ux-btn"
              @click="changeCDisabled">{{ cDisabled ? 'unDisabled' : 'disabled' }}</button>
    </div>

    <div class="demo">
      <h6>group custom content</h6>
      <ux-checkbox-group v-model="checkedList"
                         @change="onGroupChange">
        <ux-checkbox label="123"
                     value="1" />
        <ux-checkbox label="321"
                     value="2" />
      </ux-checkbox-group>
    </div>

    <div class="demo">
      <h6>group checked values</h6>
      <ux-checkbox-group v-model="checkedOpts"
                         :options="options" />
    </div>

    <div class="demo">
      <h6>group disabled</h6>
      <ux-checkbox-group disabled
                         :options="someDisabledOpts" />

    </div>

    <div class="demo">
      <h6>group on change</h6>
      <ux-checkbox-group :options="opts1"
                         @change="onGroupChange" />
    </div>

    <div class="demo">
      <h6>indeterminate</h6>
      <ux-checkbox v-model="indeterminateChecked"
                   :indeterminate="indeterminate"
                   @change="onCheckedAll"
                   label="checked All" />
      <ux-checkbox-group v-model="ieCheckedList"
                         :options="opts2"
                         @change="onCheckedOpts2" />
    </div>

    <div class="demo">
      <h6>focus, blur</h6>
      <ux-checkbox ref="checkboxRef" />
      <br>
      <button class="ux-btn"
              @click="onFocus">focus</button>
      <button class="ux-btn"
              @click="onBlur">blur</button>
    </div>

  </div>
</template>


<script>
  import '@suning/uxcool/src/components/checkbox/style/index.scss';
  import { UxCheckbox, UxCheckboxGroup } from '@suning/uxcool/src/components/checkbox/index';

  export default {
    components: {
      UxCheckbox,
      UxCheckboxGroup,
    },
    data() {
      return {
        cChecked: false,
        cDisabled: false,
        checked: false,
        disabledChecked: true,
        checkedList: [],
        options: ['a', 'b', 'c'],
        checkedOpts: ['a'],
        someDisabledOpts: [
          { label: 'aa', value: 'aa' },
          'cc',
          'dd',
          { label: 'ee', value: 'ee', disabled: false },
        ],
        opts1: [
          { label: 'aa', value: 'aa' },
          'cc',
          'dd',
          { label: 'ee', value: 'ee', disabled: true },
        ],
        opts2: ['aa', 'cc', 'dd', 'ee'],
        indeterminate: false,
        ieCheckedList: [],
        indeterminateChecked: false,
      };
    },
    methods: {
      changeCChecked() {
        this.cChecked = !this.cChecked;
      },
      changeCDisabled() {
        this.cDisabled = !this.cDisabled;
      },
      onChange(e) {
        console.log('on change', e);
      },
      onGroupChange(e, prevCheckedList) {
        console.log('onGroupChange', e, prevCheckedList);
      },
      onCheckedAll(e) {
        this.ieCheckedList = e.target.checked ? this.opts2 : [];
        this.indeterminate = false;
        this.indeterminateChecked = e.target.checked;
      },
      onCheckedOpts2(checkedList) {
        this.indeterminate = checkedList.length > 0 && checkedList.length < this.opts2.length;
        this.indeterminateChecked = checkedList.length === this.opts2.length;
      },
      onFocus() {
        const { $refs: { checkboxRef } } = this;
        if (checkboxRef) {
          checkboxRef.focus();
        }
      },
      onBlur() {
        const { $refs: { checkboxRef } } = this;
        if (checkboxRef) {
          checkboxRef.blur();
        }
      },
    },
  };
</script>
