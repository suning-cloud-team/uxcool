
function EventBus() {
  this.msgStore = {};
}

EventBus.prototype = {
  // 将消息保存到当前的消息队列中
  on(msgName, func) {
    const { msgStore } = this;
    if (Object.prototype.hasOwnProperty.call(msgStore, msgName)) {
      if (msgStore[msgName].every(f => f !== func)) {
        msgStore[msgName].push(func);
      }
    } else {
      msgStore[msgName] = [func];
    }
  },
  // 发送消息
  emit(msgName, param) {
    const { msgStore } = this;
    if (!Object.prototype.hasOwnProperty.call(msgStore, msgName)) {
      return;
    }
    msgStore[msgName].forEach(fn => fn(param));
  },
  // 移除消息监听
  off(msgName, func) {
    const { msgStore } = this;
    if (!Object.prototype.hasOwnProperty.call(msgStore, msgName)) {
      return;
    }
    msgStore[msgName] = msgStore[msgName].filter(fn => fn !== func);
  },
  // 移除消息
  clear(msgName) {
    const { msgStore } = this;
    if (!Object.prototype.hasOwnProperty.call(msgStore, msgName)) {
      return;
    }
    delete msgStore[msgName];
  },
};

const eventBus = new EventBus();
export default eventBus;
