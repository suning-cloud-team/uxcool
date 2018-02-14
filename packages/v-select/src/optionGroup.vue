
<script>
  import { CMP_TYPE_ENUM } from './constants';
  import { logFactory, getCmpParent, genUUID } from './utils';

  const log = logFactory('select:optionGroup');

  export default {
    name: 'OptionGroup',
    inject: ['root'],
    props: {
      label: { type: String, required: true },
    },
    data() {
      return {
        isOptionGroup: true,
      };
    },
    render(h) {
      return h('template', this.$slots.default);
    },
    created() {
      log('root %O', this.root);
      this.addToRoot();
    },
    beforeDestroy() {
      this.removeFromRoot();
    },
    computed: {
      UUID() {
        return genUUID();
      },
      parent() {
        return getCmpParent(this);
      },
    },
    methods: {
      addToRoot() {
        this.root.addDescendant({
          type: CMP_TYPE_ENUM.GROUP,
          UUID: this.UUID,
          parent: this.parent,
          vm: this,
        });
      },
      removeFromRoot() {
        this.root.removeDescendant(this);
      },
    },
  };
</script>