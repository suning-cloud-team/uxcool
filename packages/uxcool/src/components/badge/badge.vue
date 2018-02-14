<script>
  import { buildComponentName } from '../utils';

  export default {
    name: buildComponentName('Badge'),
    props: {
      prefixCls: {
        type: String,
        default: 'ux-badge',
      },
      scrollNumberPrefixCls: {
        type: String,
        default: 'ux-scroll-number',
      },
      count: [Number, String],
      showZero: Boolean,
      overflowCount: { type: [Number, String], default: 99 },
      dot: Boolean,
      customStyle: Object,
      status: {
        type: String,
        validator(val) {
          return ['success', 'processing', 'default', 'error', 'warning'].indexOf(val) !== -1;
        },
      },
      text: String,
      theme: {
        type: String,
        default: 'light',
      },
    },
    data() {
      return {};
    },
    computed: {
      isDot() {
        const { dot, status } = this;
        return dot || status;
      },
      displayCount() {
        const { count, overflowCount, isDot } = this;
        const [nCnt, nOfCnt] = [Number(count), Number(overflowCount)];
        if (isDot || Number.isNaN(nCnt) || Number.isNaN(nOfCnt)) {
          return '';
        }
        return nCnt > nOfCnt ? `${nOfCnt}+` : nCnt;
      },
      isZero() {
        const { displayCount } = this;
        return displayCount === 0;
      },
      isHidden() {
        const {
          isZero, showZero, isDot, displayCount
        } = this;
        return !isDot && ((isZero && !showZero) || displayCount === '');
      },
      statusClasses() {
        const { prefixCls, status } = this;
        return {
          [`${prefixCls}-status-dot`]: status,
          [`${prefixCls}-status-${status}`]: status,
        };
      },
      scrollNumberClasses() {
        const {
          prefixCls, scrollNumberPrefixCls, isDot, displayCount, status
        } = this;
        return {
          [`${scrollNumberPrefixCls}`]: true,
          [`${prefixCls}-dot`]: isDot,
          [`${prefixCls}-count`]: !isDot,
          [`${prefixCls}-multiple-words`]: String(displayCount).length > 1,
          [`${prefixCls}-status-${status}`]: status,
        };
      },
      badgeClasses() {
        const { prefixCls, status, theme } = this;
        return {
          [prefixCls]: true,
          [`${prefixCls}-${theme}`]: true,
          [`${prefixCls}-status`]: status,
        };
      },
    },
    render(h) {
      const {
        prefixCls,
        status,
        statusClasses,
        badgeClasses,
        customStyle,
        displayCount,
        isHidden,
        $slots,
        text,
        scrollNumberPrefixCls,
        scrollNumberClasses,
      } = this;
      const { default: slotDefault = [] } = $slots;
      const hasSlotDefault = slotDefault.length > 0;
      const textContent = h('span', { class: `${prefixCls}-status-text` }, text);
      if (!hasSlotDefault && status) {
        return h(
          'span',
          {
            class: badgeClasses,
            style: customStyle,
          },
          [
            h('span', {
              class: statusClasses,
            }),
            textContent,
          ]
        );
      }

      const subItems = [];
      if (!isHidden) {
        const scrollNumber = h(
          'sup',
          {
            class: {
              ...scrollNumberClasses,
            },
            style: customStyle,
          },
          [
            h(
              'span',
              {
                class: {
                  [`${scrollNumberPrefixCls}-only`]: true,
                },
              },
              [displayCount]
            ),
          ]
        );
        let item = [scrollNumber];
        if (hasSlotDefault) {
          item = h(
            'transition',
            {
              attrs: {
                name: `${prefixCls}-zoom`,
              },
              props: {
                appear: true,
              },
            },
            [scrollNumber]
          );
        }
        subItems.push(item);

        if (text) {
          subItems.push(textContent);
        }
      }

      return h(
        'span',
        {
          class: [badgeClasses, { [`${prefixCls}-not-a-wrapper`]: !hasSlotDefault }],
        },
        [slotDefault, ...subItems]
      );
    },
  };
</script>
