<template>
  <v-dialog v-bind="bindProps"
            :class="`${prefixCls}-${theme}`"
            v-on="$listeners"
            @close="onCancel">
    <template v-if="title||$slots.title"
              slot="title">
      <slot name="title">{{ title }}</slot>
    </template>
    <slot/>
    <template v-if="!hideFooter"
              slot="footer">
      <slot name="footer">
        <button v-if="okCancel"
                class="ux-btn"
                @click="onCancel">
          {{ cancelText }}
        </button>

        <button :class="`ux-btn-${okType}`"
                class="ux-btn"
                @click="onOk">
          {{ okText }}
        </button>
      </slot>
    </template>
  </v-dialog>
</template>

<script>
  import omit from 'object.omit';
  import VDialog from '@cloud-sn/v-dialog';
  import { buildComponentName } from '../utils';

  export default {
    name: buildComponentName('Modal'),
    components: {
      VDialog,
    },
    props: {
      prefixCls: {
        type: String,
        default: 'ux-modal',
      },
      value: {
        type: Boolean,
        required: true,
      },
      title: {
        type: String,
        default: '',
      },
      confirmLoading: {
        type: Boolean,
        default: false,
      },
      closable: {
        type: Boolean,
        default: true,
      },
      width: {
        type: String,
        default: '520px',
      },
      okType: {
        type: String,
        default: 'primary',
      },
      okText: {
        type: String,
        default: '确定',
      },
      cancelText: {
        type: String,
        default: '取消',
      },
      maskClosable: {
        type: Boolean,
        default: true,
      },
      zIndex: [Number, String],
      dialogStyle: Object,
      dialogClass: [String, Array, Object],
      wrapClass: [String, Array, Object],
      wrapStyle: Object,
      maskTransitionName: {
        type: String,
        default: 'fade',
      },
      transitionName: {
        type: String,
        default: 'zoom',
      },
      getContainer: {
        type: Function,
        default: undefined,
      },
      bodyStyle: Object,
      maskStyle: Object,
      mask: {
        type: Boolean,
        default: true,
      },
      hideFooter: {
        type: Boolean,
        default: false,
      },
      okCancel: {
        type: Boolean,
        default: true,
      },
      theme: {
        type: String,
        default: 'light',
      },
      control: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      bindProps() {
        return omit(this.$props, ['confirmLoading', 'okType', 'okText', 'cancelText']);
      },
    },
    methods: {
      close() {
        this.$emit('input', false);
      },
      onOk(e) {
        const { control, close } = this;
        if (!control) {
          close();
        }
        this.$emit('ok', e);
      },
      onCancel(e) {
        const { control, close } = this;
        if (!control) {
          close();
        }
        this.$emit('cancel', e);
      },
    },
  };
</script>
