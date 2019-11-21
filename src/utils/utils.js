/* eslint-disable space-before-function-paren */
const utils = {
  // 生成随机的uid
  uid: () => {
    return `${+new Date()}${Math.random()}`
  },
  /*
    函数节流
  */
  throttle: (fn, threshhold) => {
    let timeout
    let start = new Date()
    threshhold = threshhold || 160
    return function () {
      const curr = new Date() - 0
      clearTimeout(timeout)
      if (curr - start >= threshhold) {
        fn.apply(this, arguments)
        start = curr
      } else {
        timeout = setTimeout(() => {
          fn.apply(this, arguments)
        }, threshhold)
      }
    }
  },
  // 判断参数是否在其中一个
  oneOf(value, validList) {
    for (let i = 0; i < validList.length; i++) {
      if (value === validList[i]) {
        return true
      }
    }
    return false
  },
  // 把图片转换成为base64
  /**
   * element-uploader组件中使用
   * onchangeFun (file, fileList) { // 上传图片后，获取图片路径
      this.getBase64(file.raw).then(res => {
        //doSomeThings
      });
    }
   * 
   */
  getBase64(file) {
    return new Promise(function (resolve, reject) {
      let reader = new FileReader();
      let imgResult = "";
      reader.readAsDataURL(file);
      reader.onload = function () {
        imgResult = reader.result;
      };
      reader.onerror = function (error) {
        reject(error);
      };
      reader.onloadend = function () {
        resolve(imgResult);
      };
    });
  },
  // 向上寻找父组件
  findComponentUpward(context, componentName, componentNames) {
    if (typeof componentName === "string") {
      componentNames = [componentName];
    } else {
      componentNames = componentName;
    }
    let parent = context.$parent; // 找到这个组件的父元素
    let name = parent.$options.name; //找到父元素的name值
    while (parent && (!name || componentNames.indexOf(name) < 0)) {
      parent = parent.$parent
      if (parent) {
        name = parent.$options.name;
      }
    }
    return parent;
  }
}
export default utils
