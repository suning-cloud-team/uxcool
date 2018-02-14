export default {
  methods: {
    getFormat() {
      const { locale, hasTimePicker } = this;
      let { format } = this;
      if (!format) {
        if (hasTimePicker) {
          format = locale.dateTimeFormat;
        } else {
          format = locale.dateFormat;
        }
      }
      return format;
    },
  },
};
