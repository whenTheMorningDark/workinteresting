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
  }
}
export default utils
