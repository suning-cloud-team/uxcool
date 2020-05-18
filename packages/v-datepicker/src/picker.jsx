import Trigger from '@cloud-sn/v-trigger';
import placements from './picker/placements';

export default {
  name: 'Picker',
  props: {
    prefixCls: {
      type: String,
      default: 'v-calendar-picker',
    },
    visible: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    align: {
      type: Object,
      default() {
        return {};
      },
    },
    placement: {
      type: String,
      default: 'bottomLeft',
      validator(val) {
        return ['bottomLeft', 'bottomRight', 'topRight', 'topLeft'].indexOf(val) > -1;
      },
    },
    builtinPlacements: {
      type: Object,
      default() {
        return placements;
      },
    },
    transitionName: {
      type: String,
      default: 'slide-up',
    },
    animation: {
      type: String,
      default: '',
    },
    getPopupContainer: {
      type: Function,
      default: null,
    },
    destroyPopupOnHide: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      innerVisible: false,
    };
  },
  computed: {
    actions() {
      const { disabled } = this;
      return disabled ? [] : ['click'];
    },
  },
  watch: {
    visible(nVal) {
      this.setInnerVisible(nVal);
    },
  },
  created() {
    this.setInnerVisible(this.visible);
  },
  methods: {
    setInnerVisible(visible) {
      const { innerVisible } = this;

      this.innerVisible = !!visible;
      if (innerVisible !== visible) {
        this.$emit('visible-change', visible);
      }
    },
    onVisibleChange(visible) {
      this.setInnerVisible(visible);
    },
  },
  render() {
    const {
      $scopedSlots,
      prefixCls,
      innerVisible,
      actions,
      align,
      placement,
      builtinPlacements,
      transitionName,
      animation,
      getPopupContainer,
      destroyPopupOnHide,
      onVisibleChange,
    } = this;
    const triggerSlotFn = $scopedSlots.trigger;
    const popupSlotFn = $scopedSlots.popup;

    const props = {
      prefixCls,
      visible: innerVisible,
      actions,
      popupAlign: align,
      popupPlacement: placement,
      builtinPlacements,
      popupTransitionName: transitionName,
      popupAnimation: animation,
      getPopupContainer,
      destroyPopupOnHide,
    };
    const on = {
      'popup-visible-change': onVisibleChange,
    };
    return (
      <Trigger {...{ props, on }}>
        <template slot="trigger">{triggerSlotFn()}</template>
        <template slot="popup">{popupSlotFn()}</template>
      </Trigger>
    );
  },
};
