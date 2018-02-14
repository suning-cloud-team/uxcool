<template>
  <div :class="[classes, notificationClass]"
       :style="notificationStyle">
    <transition-group tag="div"
                      :name="groupTransition">
      <!-- 通过key,使vue不再复用,以处理内部使用setTimeout时,复用后可能无法找到实例的问题 -->
      <notice v-for="(item,i) in value"
              :key="item.$$id"
              v-bind="item.props"
              :prefix-cls="prefixCls"
              @close="onClose(item)">
      </notice>
    </transition-group>
  </div>
</template>


<script>
  import Notice from './notice.vue';

  export default {
    name: 'Notification',
    props: {
      prefixCls: {
        type: String,
        default: 'v-notification',
      },
      notificationClass: [String, Array, Object],
      notificationStyle: Object,
      transitionName: String,
      animation: {
        type: String,
        default: 'fade',
      },
      value: Array,
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
    components: {
      Notice,
    },
  };
</script>
