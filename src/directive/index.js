import drag from "./drag";
const install = function (Vue) {
  Vue.directive("calendar-drag", drag);
}

// if (window.Vue) {
//   window['calendar-drag'] = drag;
//   Vue.use(install)
// }
drag.install = install;
export default drag;
