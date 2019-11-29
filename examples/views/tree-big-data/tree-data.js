
export default {
  data() {
    return {
      nodeAttr: {
        disabled: [],
        selectable: [],
        disableCheckbox: []
      }
    };
  },
  methods: {
    createBigDataSource(firstLevelCount = 100, secondLevelCount = 10, thirdLevelCount = 10) {
      const dataSource = [];
      for (let firstlevel = 0; firstlevel < firstLevelCount; firstlevel += 1) {
        const firstLevelNode = this.createNode('0', dataSource.length);
        firstLevelNode.children = [];
        for (let sndLevel = 0; sndLevel < secondLevelCount; sndLevel += 1) {
          const sndNode = this.createNode(firstLevelNode.key, firstLevelNode.children.length);
          sndNode.children = [];
          for (let trdLevel = 0; trdLevel < thirdLevelCount; trdLevel += 1) {
            const trdNode = this.createNode(sndNode.key, sndNode.children.length);
            sndNode.children.push(trdNode);
          }
          firstLevelNode.children.push(sndNode);
        }
        dataSource.push(firstLevelNode);
      }
      return dataSource;
    },
    createNode(parentKey, key) {
      const node = {
        title: `${parentKey}-${key}`,
        key: `${parentKey}-${key}`,
        dataValue: '',
      };
      const attr = ['disabled', 'selectable', 'disableCheckbox'];
      const { nodeAttr } = this;
      attr.forEach((value) => {
        if (nodeAttr && nodeAttr[value] && (nodeAttr[value].indexOf(node.key) > -1)) {
          node[value] = true;
        }
      });
      return node;
    },
  },
};
