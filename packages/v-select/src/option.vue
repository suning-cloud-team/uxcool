 
<script>
  import { CMP_TYPE_ENUM } from './constants';
  import { logFactory, getCmpParent, genUUID } from './utils';

  const log = logFactory('select:option');

  export default {
    name: 'Option',
    inject: ['root'],
    props: {
      prefixCls: String,
      value: { type: [String, Number], required: true },
      label: String,
      disabled: Boolean,
    },
    data() {
      return {
        isOption: true,
      };
    },
    render() {},
    created() {
      log('root: %O', this.root);
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
          type: CMP_TYPE_ENUM.OPTION,
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