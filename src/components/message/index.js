import Notification from "../base/notification/index";
const prefixCls = "ivu-message";
const prefixKey = 'ivu_message_key_';
// const iconPrefixCls = 'ivu-icon';
const defaults = {
  top: 24,
  duration: 1.5
}
// const iconTypes = {
//   'info': 'ios-information-circle',
//   'success': 'ios-checkmark-circle',
//   'warning': 'ios-alert',
//   'error': 'ios-close-circle',
//   'loading': 'ios-loading'
// };

let messageInstance;
let name = 1;

function getMessageInstance() {
  messageInstance = messageInstance || Notification.newInstance({
    prefixCls: prefixCls,
    style: {
      top: `${defaults.top}px`
    }
  })
  return messageInstance;
}

// 定义message中的notice方法
function notice(content = "", duration = defaults.duration, type, onClose = function () {}, closable = false) {
  // const iconType = iconTypes[type];

  // const loadCls = type === 'loading'?'ivu-load-loop':'';
  let instance = getMessageInstance();
  instance.notice({
    name: `${prefixKey}${name}`,
    duration: duration,
    styles: {},
    content: `我是message${content}`,
    onClose: onClose,
    type: "message",
    msgType: type,
    closable
  })
  return (function () {
    let target = name++;
    return function () {
      instance.remove(`${prefixKey}${target}`)
    }
  })()
}
export default {
  name: 'Message',

  info(options) {
    console.log("info");
    return this.message('info', options);
  },
  message(type, options) {
    if (typeof options === 'string') {
      options = {
        content: options
      };
    }
    return notice(options.content, options.duration, type, options.onClose, options.closable, options.render, options.background);
  },
  destroy() {
    let instance = getMessageInstance();
    messageInstance = null;
    instance.destroy('ivu-message');
  }
};
