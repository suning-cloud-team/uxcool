import Vue from 'vue';

import '@cloud-sn/v-notification/css/index.scss';

import Notification from '@cloud-sn/v-notification';

let seed = 0;

const instance = Notification.newInstance({});

const vm = new Vue({
  el: '#app',
  data: {
    items: Array(10)
      .fill(0)
      .map((v, i) => ({ idx: i, name: `name_${i}` })),
  },
  methods: {
    remove(item) {
      this.items = this.items.filter(v => v !== item);
    },
    add() {
      instance.notice({
        $$id: `$$id-${(seed += 1)}`,
        props: {
          content: 'new notice',
        },
        onClose() {
          console.log('notice');
        },
      });
    },
    duration() {
      instance.notice({
        $$id: `$$id-${(seed += 1)}`,
        props: {
          content: '<p>no close</p>',
          dangerouslySetInnerHTML: true,
          duration: 0,
        },
      });
    },
    closable() {
      const h = this.$createElement;
      instance.notice({
        $$id: `$$id-${(seed += 1)}`,
        props: {
          content: h('div', { style: { color: 'yellow' } }, 'closable = true'),
          closable: true,
          duration: 4500,
        },
        onClose() {
          console.log('closable');
        },
      });
    },
    close(notice) {
      instance.remove(notice);
    },
    manualClose() {
      const { close } = this;
      const notice = {
        $$id: `$$id-${(seed += 1)}`,
        props: {
          content: (
            <div>
              <button
                on-click={() => {
                  close(notice);
                }}
              >
                manual close
              </button>
              <span>manual close notification</span>
            </div>
          ),
          duration: 0,
        },
      };
      instance.notice(notice);
    },
  },
});
