<template>
  <a role="button"
     :title="todayStr"
     :class="classes"
     @click="onClick">
    {{content}}
  </a>
</template>


<script>
  import { formatDate, isAllowedDate } from '../utils';

  export default {
    name: 'TodayButton',
    props: {
      prefixCls: String,
      locale: Object,
      disabledDate: Function,
      disabled: Boolean,
      format: String,
      text: String,
      isShowOk: Boolean,
      hasTimePicker: Boolean,
    },
    computed: {
      content() {
        const {
          text, hasTimePicker, locale, isShowOk
        } = this;
        let content = '';
        if (text) {
          content = text;
        } else if (hasTimePicker || isShowOk) {
          content = locale.now;
        } else {
          content = locale.today;
        }
        return content;
      },
      today() {
        return new Date();
      },
      classes() {
        const {
          prefixCls, disabled, disabledDate, today
        } = this;
        return {
          [`${prefixCls}-today-btn`]: true,
          [`${prefixCls}-today-btn-disabled`]:
            (disabledDate && !isAllowedDate(today, disabledDate)) || disabled,
        };
      },
      todayStr() {
        return formatDate(this.today, this.format, { locale: this.locale.DateFnsLocale });
      },
    },
    methods: {
      onClick() {
        if (this.disabled) {
          return;
        }
        this.$emit('on-click');
      },
    },
  };
</script>
