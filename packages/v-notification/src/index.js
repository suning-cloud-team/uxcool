import Vue from 'vue';
import Notification from './notification.vue';

export default Notification;

Notification.newInstance = function newInstance(props) {
  const {
    getContainer, top, notificationStyle, ...other
  } = props;

  const vm = new Vue({
    components: {
      Notification,
    },
    data() {
      return {
        attrs: null,
        listeners: null,
      };
    },
    destroyed() {
      const { $el } = this;
      const { parentNode } = $el;
      if (parentNode) {
        parentNode.removeChild($el);
      }
    },
    render() {
      const { attrs, listeners } = this;
      if (!attrs) {
        return null;
      }
      return <notification {...{ props: attrs, on: listeners }} />;
    },
  }).$mount();

  let container = document.body;
  if (typeof getContainer === 'function') {
    const node = getContainer();
    if (node.appendChild) {
      container = node;
    }
  }

  container.appendChild(vm.$el);

  let style;
  if (notificationStyle) {
    style = notificationStyle;
    if (typeof top !== 'undefined') {
      notificationStyle.top = top;
    }
  }

  const attrs = {
    ...other,
    notificationStyle: style,
    value: [],
  };
  const listeners = {
    input(val) {
      attrs.value = val;
    },
  };
  vm.attrs = attrs;
  vm.listeners = listeners;
  return {
    notice(notice) {
      attrs.value.push(notice);
    },
    remove(notice) {
      attrs.value = attrs.value.filter(v => v !== notice);
    },
    destroy() {
      vm.$destroy();
    },
  };
};
