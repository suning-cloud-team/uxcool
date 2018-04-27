
<script>
  import { CMP_TYPE_ENUM } from './constants';
  import { logFactory, getCmpParent, genUUID } from './utils';

  const log = logFactory('select:option');

  export default {
    name: 'Option',
    inject: ['selectRoot'],
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
    computed: {
      UUID() {
        return genUUID();
      },
      parent() {
        return getCmpParent(this);
      },
    },
    created() {
      log('selectRoot: %O', this.selectRoot);
      this.addToRoot();
    },
    beforeDestroy() {
      this.removeFromRoot();
    },
    methods: {
      addToRoot() {
        this.selectRoot.addDescendant({
          type: CMP_TYPE_ENUM.OPTION,
          UUID: this.UUID,
          parent: this.parent,
          vm: this,
        });
      },
      removeFromRoot() {
        this.selectRoot.removeDescendant(this);
      },
    },
    render() {},
  };
</script>
