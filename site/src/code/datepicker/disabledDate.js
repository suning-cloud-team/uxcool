export default `
<ux-date-picker :disabled-date="disabledDate"
:disabled-time="disabledTime"></ux-date-picker>
<br>
<ux-range-date-picker :disabled-date="disabledDate"
      :disabled-time="disabledRangeTime">
</ux-range-date-picker>

<script>
import { isBefore, startOfDay, subDays } from 'date-fns';

export default {
  methods: {
    disabledDate(current) {
      return current && isBefore(current, startOfDay(subDays(new Date(), 3)));
    },
    disabledTime() {
      return {
        disabledHours() {
          return Array(20)
            .fill(0)
            .map((v, i) => i + 5);
        },
        disabledMinutes() {
          return Array(20)
            .fill(0)
            .map((v, i) => i + 10);
        },
        disabledSeconds() {
          return [25, 56];
        },
      };
    },
    disabledRangeTime(values, type) {
      if (type === 'start') {
        return {
          disabledHours() {
            return Array(20)
              .fill(0)
              .map((v, i) => i + 1);
          },
          disabledMinutes() {
            return Array(20)
              .fill(0)
              .map((v, i) => i + 2);
          },
          disabledSeconds() {
            return [20, 21];
          },
        };
      }
      return {
        disabledHours() {
          return Array(20)
            .fill(0)
            .map((v, i) => i + 5);
        },
        disabledMinutes() {
          return Array(20)
            .fill(0)
            .map((v, i) => i + 10);
        },
        disabledSeconds() {
          return [25, 56];
        },
      };
    },
  },
};
</script>
`;
