<template>
  <div>
    <h6>normal</h6>
    <ux-switch @change="onChange"
               @click="onClick"
               @mouseup="onMouseup" />
    <ux-switch autofocus
               tabindex="2"
               checked/>
    <h6>disabled</h6>
    <ux-switch disabled/>
    <ux-switch disabled
               checked/>

    <h6>change disabled</h6>
    <ux-switch :disabled="disabled"
               checked/>
    <ux-button @click="changeDisabled">
      change disabled
    </ux-button>
    <h6>content</h6>
    <ux-switch checked-children="abc"
               unchecked-children="bcaddd" />
    <br>
    <ux-switch>
      <span slot="uncheckedChildren">
        测试1
      </span>
      <span slot="checkedChildren">
        测试2
      </span>
    </ux-switch>
    <br>
    <ux-switch>
      <span slot="checkedChildren">
        <ux-icon type="setting" />
      </span>
      <span slot="uncheckedChildren">
        <ux-icon type="safty" />
      </span>
    </ux-switch>
    <h6>loading</h6>
    <ux-switch loading
               checked/>
    <ux-switch loading
               checked
               size="small" />

    <h6>size</h6>
    <ux-switch />
    <ux-switch size="small" />
    <h6>color</h6>
    <ux-switch :class="checked ? 'checked' : 'unchecked'"
               @change="onColorChange" />

    <h6>focus</h6>
    <ux-switch ref="fSwitchRef" />
    <ux-button @click="focus">focus</ux-button>
    <ux-button @click="blur">blur</ux-button>

    <h6>v-model</h6>
    {{modelChecked}}
    <ux-switch v-model="modelChecked" />
  </div>
</template>

<script>
  import { Switch, Icon, Button } from '@suning/uxcool';

  export default {
    components: {
      UxSwitch: Switch,
      UxIcon: Icon,
      UxButton: Button,
    },
    data() {
      return {
        checked: false,
        disabled: true,
        modelChecked: false,
      };
    },
    methods: {
      changeDisabled() {
        this.disabled = !this.disabled;
      },
      onChange(checked) {
        console.log('change checked', checked);
      },
      onClick(checked) {
        console.log('click checked', checked);
      },
      onMouseup(e) {
        console.log('mouseup ', e);
      },
      onColorChange(checked) {
        this.checked = checked;
      },
      focus() {
        const { $refs: { fSwitchRef } } = this;
        if (fSwitchRef) {
          fSwitchRef.focus();
        }
      },
      blur() {
        const { $refs: { fSwitchRef } } = this;
        if (fSwitchRef) {
          fSwitchRef.blur();
        }
      },
    },
  };
</script>
<style scoped>
  .checked {
    border-color: rgb(19, 206, 102);
    background-color: rgb(19, 206, 102);
  }
  .unchecked {
    border-color: rgb(255, 73, 73);
    background-color: rgb(255, 73, 73);
  }
</style>
