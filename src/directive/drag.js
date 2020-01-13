// 日历拖拽指令
export default {
  bind(el, binding, vnode) {
    let dragHeader = el.querySelector(".calendar-header");
    let dragDom = el;
    dragHeader.style.cssText += ';cursor:move';
    dragDom.style.cssText += ';top:0px'
    dragHeader.onmousedown = (e) => {
      e = e || window.event
      let startX = e.clientX;
      let startY = e.clientY;
      const disX = e.clientX - dragDom.offsetLeft;
      const disY = e.clientY - dragDom.offsetTop;
      const dragDomWidth = dragDom.offsetWidth;
      const screenWidth = window.innerWidth;
      const dragDomHeight = dragDom.offsetHeight;
      const screenHeight = window.innerHeight;
      document.onmousemove = function (e) {
        e = e || window.event
        let left = e.clientX - disX;
        let top = e.clientY - disY;
        if (left <= 0) {
          left = 0;
        } else if (left >= screenWidth - dragDomWidth) {
          left = screenWidth - dragDomWidth;
        }
        if (top <= 0) {
          top = 0;
        } else if (top > screenHeight - dragDomHeight) {
          top = screenHeight - dragDomHeight
        }

        dragDom.style.cssText += `;left:${left}px;top:${top}px`
      }
      document.onmouseup = function (e) {
        console.log(vnode);
        e = e || window.event
        let endX = e.clientX;
        let endY = e.clientY;
        if (startX === endX && startY === endY) {
          console.log("click");
          vnode.child.$emit("headerEvent", "click");
        } else {
          vnode.child.$emit("headerEvent", "onmouseup");
        }
        document.onmousemove = null
        document.onmouseup = null
      }
    }

  }
}
