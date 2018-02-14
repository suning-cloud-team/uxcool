<template>
  <div :class="classes"
       v-show="isShowOk||showToday">
    <today-button v-if="showToday"
                  :prefix-cls="prefixCls"
                  :locale="locale"
                  :disabled-date="disabledDate"
                  :disabled="disabled"
                  :has-time-picker="hasTimePicker"
                  :is-show-ok="isShowOk"
                  :format="format"
                  :text="todayText"
                  @on-click="onTodayClick">
    </today-button>
    <time-picker-button v-if="hasTimePicker"
                        :prefix-cls="prefixCls"
                        :locale="locale"
                        :disabled="timePickerDisabled"
                        :is-time-picker="isTimePicker"
                        @on-click="onTimePickerClick"></time-picker-button>
    <ok-button v-if="isShowOk"
               :prefix-cls="prefixCls"
               :locale="locale"
               :disabled="okDisabled"
               @on-click="onOkClick"></ok-button>
  </div>
</template>

<script>
  import OkButton from './okButton.vue';
  import TodayButton from './todayButton.vue';
  import TimePickerButton from './timePickerButton.vue';

  export default {
    name: 'CalendarFooter',
    props: {
      prefixCls: String,
      locale: Object,
      value: Date,
      showOk: Boolean,
      isTimePicker: Boolean,
      hasTimePicker: Boolean,
      showToday: Boolean,
      disabled: Boolean,
      okDisabled: Boolean,
      format: String,
      todayText: String,
      disabledDate: Function,
      timePickerDisabled: Boolean,
    },
    computed: {
      isShowOk() {
        const { showOk, hasTimePicker } = this;
        return showOk === true || (showOk !== false && !!hasTimePicker);
      },
      classes() {
        const { prefixCls, isShowOk } = this;
        return {
          [`${prefixCls}-footer`]: true,
          [`${prefixCls}-footer-show-ok`]: isShowOk,
        };
      },
    },
    methods: {
      onOkClick() {
        this.$emit('on-ok');
      },
      onTodayClick() {
        this.$emit('on-today', new Date());
      },
      onTimePickerClick() {
        this.$emit('on-time-picker');
      },
    },
    components: {
      OkButton,
      TodayButton,
      TimePickerButton,
    },
  };
</script>