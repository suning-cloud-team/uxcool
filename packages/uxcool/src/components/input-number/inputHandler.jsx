import { buildComponentName } from '../utils';

export default {
  name: buildComponentName('InputHandler'),
  render() {
    const { $slots, $listeners } = this;
    return <span {...{ on: $listeners }}>{$slots.default}</span>;
  },
};
