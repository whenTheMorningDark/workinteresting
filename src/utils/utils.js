/* eslint-disable space-before-function-paren */
const utils = {
  // 生成随机的uid
  uid: () => {
    return `${+new Date()}${Math.random()}`;
  },
  /*
    函数节流
  */
  throttle: (fn, threshhold) => {
    let timeout;
    let start = new Date();
    threshhold = threshhold || 160;
    return function() {
      const curr = new Date() - 0;
      clearTimeout(timeout);
      if (curr - start >= threshhold) {
        fn.apply(this, arguments);
        start = curr;
      } else {
        timeout = setTimeout(() => {
          fn.apply(this, arguments);
        }, threshhold);
      }
    };
  },
  // 判断参数是否在其中一个
  oneOf(value, validList) {
    for (let i = 0; i < validList.length; i++) {
      if (value === validList[i]) {
        return true;
      }
    }
    return false;
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
    return new Promise(function(resolve, reject) {
      let reader = new FileReader();
      let imgResult = "";
      reader.readAsDataURL(file);
      reader.onload = function() {
        imgResult = reader.result;
      };
      reader.onerror = function(error) {
        reject(error);
      };
      reader.onloadend = function() {
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
      parent = parent.$parent;
      if (parent) {
        name = parent.$options.name;
      }
    }
    return parent;
  },
  // 将对象数组去重,根据某个属性字段来去重
  /*
    @ params arr 去重的数组
    @ String string 去重的字段
  */
  uniqeObjectArr(arr, string) {
    let hash = {};
    arr = arr.reduce((item, next) => {
      hash[next[string]] ? "" : (hash[next[string]] = true && item.push(next));
      return item;
    }, []);
    return arr;
  },
  // 对象转换成字符串
  ObjToStr(val) {
    return Object.prototype.toString.call(val);
  },
  // 判断是不是数组
  isArr(val) {
    return Array.isArray(val) || this.ObjToStr(val) === "[object Array]";
  },
  // 判断是不是数字
  isNum(val) {
    return !isNaN(val) || this.ObjToStr(val) === "[object Number]";
  },
  // 扁平化数组
  /**
   * flatten(['a', ['b', ['c']], 'd', ['e']]); // -> ['a', 'b', 'c', 'd', 'e']
   *
   */
  flatten(arr) {
    return this.curflatten(arr, []);
  },
  curflatten(arr, res) {
    // arr 初始数组 res 结果数组
    let len = arr.length;
    let i = -1;
    let cur;
    while (len) {
      len--;
      cur = arr[++i];
      this.isArr(cur) ? this.curflatten(cur, res) : res.push(cur); // 递归解构数组
    }
    return res;
  },
  // 发布新闻时需要提醒发布的时间。
  // 写一个函数，传递一个参数为时间戳，完成时间的格式化。
  // 如果发布一分钟内，输出：刚刚；
  // n 分钟前发布，输出：n分钟前；
  // 超过一个小时，输出：n小时前；超过一天，输出：n天前；
  // 但超过一个星期，输出发布的准确时间
  // let str = "2018-04-07 14:38:16";
  // console.log(new Date(str).getTime()) // 都是获取当前时间的毫秒数
  // console.log(Date.now()) // 都是获取当前时间的毫秒数
  format(date) {
    const min = 60 * 1000;
    const hour = 60 * min;
    const day = hour * 24;
    const week = day * 7;
    const month = day * 30;
    const year = month * 12;
    const time = this.isNum(date) ? date : new Date(date).getTime();
    const difVal = new Date().getTime() - time;
    if (difVal < 0) {
      return date;
    }
    let monthC = difVal / month;
    let weekC = difVal / week;
    let dayC = difVal / day;
    let hourC = difVal / hour;
    let minC = difVal / min;
    let yearC = difVal / year;
    if (yearC >= 1) return parseInt(yearC) + "年前";
    if (monthC >= 1) return parseInt(monthC) + "个月前";
    if (weekC >= 1) return parseInt(weekC) + "周前";
    if (dayC >= 1) return parseInt(dayC) + "天前";
    if (hourC >= 1) return parseInt(hourC) + "个小时前";
    if (minC >= 1) return parseInt(minC) + "分钟前";
    if (minC < 1) return "刚刚";
  }
};
export default utils;
