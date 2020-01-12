import Notification from "./Notification";
import Vue from "vue";

Notification.newInstance = properties => {
  const _props = properties || {};

  const Instance = new Vue({
    render(h) {
      return h(Notification, {
        props: _props
      })
    }
  })
  const component = Instance.$mount();
  document.body.appendChild(component.$el);
  const notification = Instance.$children[0];
  console.log(notification);
  return {
    notice(noticeProps) {
      console.log("notice");
      notification.add(noticeProps) // 调用notification中的add方法
    },
    component: notification
  }
}
export default Notification;
