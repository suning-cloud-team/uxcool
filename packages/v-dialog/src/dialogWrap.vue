<script>
  import Vue from 'vue';
  import Mixin from './mixin';
  import InnerDialog from './dialog.vue';

  export default {
    name: 'DialogWrap',
    components: {
      InnerDialog,
    },
    mixins: [Mixin],
    props: {
      getContainer: {
        type: Function,
        default() {
          return document.body;
        },
      },
    },
    data() {
      return {
        init: false,
        portal: null,
      };
    },
    beforeDestroy() {
      const {
        $refs, portal, getDialogVNode, $props, $listeners, $slots
      } = this;
      const { innerDialogRef } = $refs;
      if (portal) {
        portal.dialogVNode = getDialogVNode({ ...$props, ...{ value: false } }, $listeners, $slots);
      }
      if (innerDialogRef && innerDialogRef.value) {
        innerDialogRef.$once('after-close', () => {
          this.clearPortal();
        });
      } else {
        this.clearPortal();
      }
    },
    methods: {
      getDialogVNode(props, listeners, slots) {
        return (
          <inner-dialog {...{ props, on: listeners, ref: 'innerDialogRef' }}>
            <template slot="title">{slots.title}</template>
            {slots.default}
            <template slot="footer">{slots.footer}</template>
          </inner-dialog>
        );
      },
      mountPortal(vm) {
        let { portal } = this;
        portal = vm || portal;
        const container = this.getContainer();
        if (portal) {
          container.appendChild(portal.$el);
        }
      },
      createPortal(dialog) {
        const vm = new Vue({
          parent: this,
          data() {
            return {
              dialogVNode: null,
            };
          },
          destroyed() {
            const { parentNode } = this.$el;
            if (parentNode) {
              parentNode.removeChild(this.$el);
            }
          },
          render() {
            const { dialogVNode } = this;
            return dialogVNode;
          },
        }).$mount();
        vm.dialogVNode = dialog;
        this.mountPortal(vm);
        return vm;
      },

      clearPortal() {
        const { portal } = this;
        if (portal) {
          portal.$destroy();
        }
      },
    },
    // eslint-disable-next-line
    render() {
      const {
        $props, $listeners, $slots, value, init, portal, createPortal, getDialogVNode
      } = this;
      if (!init && !value) {
        return;
      }
      this.init = true;

      const dialog = getDialogVNode($props, $listeners, $slots);
      if (portal) {
        portal.dialogVNode = dialog;
      } else {
        this.portal = createPortal(dialog);
      }
    },
  };
</script>
