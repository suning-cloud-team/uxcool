<template>
  <div :class="[classes, notificationClass]"
       :style="notificationStyle">
    <transition-group tag="div"
                      appear
                      :name="groupTransition">
      <!-- 通过key,使vue不再复用,以处理内部使用setTimeout时,复用后可能无法找到实例的问题 -->
      <notice v-for="item in value"
              :key="item.$$id"
              :class="item.className"
              :style="item.style"
              v-bind="item.props"
              :prefix-cls="prefixCls"
              @close="onClose(item)" />
    </transition-group>
  </div>
</template>


<script>
  import Notice from './notice.vue';

  export default {
    name: 'Notification',
    components: {
      Notice,
    },
    props: {
      prefixCls: {
        type: String,
        default: 'v-notification',
      },
      notificationClass: {
        type: [String, Array, Object],
        default: '',
      },
      notificationStyle: {
        type: Object,
        default: null,
      },
      transitionName: {
        type: String,
        default: '',
      },
      animation: {
        type: String,
        default: 'fade',
      },
      value: {
        type: Array,
        default() {
          return [];
        },
      },
    },
    computed: {
      classes() {
        const { prefixCls } = this;
        return {
          [prefixCls]: true,
        };
      },
      groupTransition() {
        const { prefixCls, transitionName, animation } = this;
        let name = transitionName;
        if (!name && animation) {
          name = `${prefixCls}-${animation}`;
        }
        return name;
      },
    },
    methods: {
      onClose(item) {
        const { value } = this;
        this.$emit('input', value.filter(v => v !== item));
        if (typeof item.onClose === 'function') {
          item.onClose();
        }
      },
    },
  };
</script>
