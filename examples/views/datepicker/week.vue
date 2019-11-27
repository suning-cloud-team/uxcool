<template>
  <div class="demo">
    <h1>Week Picker</h1>
    <div>
      <h4>Base</h4>
      <div>week value: {{ val1 }}</div>
      <ux-week-picker v-model="val1" />
    </div>

    <div>
      <h4>Events</h4>
      <ux-week-picker @panel-change="onPanelChange"
                      @open-change="onOpenChange"
                      @change="onChange" />
    </div>
    <div>
      <h4>disabled = {{ disabled }}</h4>
      <ux-button @click="changeDisabled">change disabled</ux-button>
      <ux-week-picker :disabled="disabled" />
    </div>
    <div>
      <h4>format="YYYYY WW"</h4>
      <ux-week-picker format="YYYY WW" />
    </div>
    <div>
      <h4>visible = {{ visible }}</h4>
      <ux-button @click="changeVisible">change visible</ux-button>
      <ux-week-picker :visible="visible"
                      @open-change="onVisibleChange" />
    </div>
    <div>
      <h4>placement="topRight"</h4>
      <ux-week-picker placement="topRight" />
    </div>
    <div>
      <h4>get-popup-container</h4>
      <div ref="wrapRef" />
      <ux-week-picker :get-popup-container="getPopupConatiner" />
    </div>
    <div>
      <h4>placeholder="this is week"</h4>
      <ux-week-picker placeholder="this is week" />
    </div>
    <div>
      <h4>allow-clear="false"</h4>
      <ux-week-picker :allow-clear="false" />
    </div>
    <div>
      <h4>locale = EN</h4>
      <ux-button @click="changeLocale">change locale</ux-button>
      <ux-week-picker :locale="locale" />
    </div>
  </div>
</template>

<script>
  import { Datepicker, Button } from '@suning/uxcool';
  import localeEN from '@suning/uxcool/src/components/datepicker/locale/en_US.js';
  import localeCN from '@suning/uxcool/src/components/datepicker/locale/zh_CN.js';

  export default {
    components: {
      UxWeekPicker: Datepicker.Week,
      UxButton: Button,
    },
    data() {
      return {
        val1: null,
        disabled: false,
        visible: true,
        locale: localeEN.lang,
      };
    },
    created() {
      this.originLocale = localeCN.lang;
    },
    methods: {
      getPopupConatiner() {
        return this.$refs.wrapRef;
      },
      onPanelChange(...args) {
        console.log('onPanelChange', ...args);
      },
      onOpenChange(...args) {
        console.log('onOpenChange', ...args);
      },
      onChange(...args) {
        console.log('onChange', ...args);
      },
      onVisibleChange(visible) {
        this.visible = visible;
      },
      changeDisabled() {
        this.disabled = !this.disabled;
      },
      changeVisible() {
        this.visible = !this.visible;
      },
      changeLocale() {
        const { locale, originLocale } = this;
        this.originLocale = locale;
        this.locale = originLocale;
      },
    },
  };
</script>
