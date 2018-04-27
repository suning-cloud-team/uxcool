
<script>
  import { CMP_TYPE_ENUM } from './constants';
  import { logFactory, getCmpParent, genUUID } from './utils';

  const log = logFactory('select:optionGroup');

  export default {
    name: 'OptionGroup',
    inject: ['selectRoot'],
    props: {
      label: { type: String, required: true },
    },
    data() {
      return {
        isOptionGroup: true,
      };
    },
    computed: {
      UUID() {
        return genUUID();
      },
      parent() {
        return getCmpParent(this);
      },
    },
    created() {
      log('selectRoot %O', this.selectRoot);
      this.addToRoot();
    },
    beforeDestroy() {
      this.removeFromRoot();
    },
    methods: {
      addToRoot() {
        this.selectRoot.addDescendant({
          type: CMP_TYPE_ENUM.GROUP,
          UUID: this.UUID,
          parent: this.parent,
          vm: this,
        });
      },
      removeFromRoot() {
        this.selectRoot.removeDescendant(this);
      },
    },
    render(h) {
      return h('template', this.$slots.default);
    },
  };
</script>
