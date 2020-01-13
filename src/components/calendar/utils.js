const getNewDate = (date) => {
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  let hour = date.getHours()
  let minute = date.getMinutes()
  let second = date.getSeconds()
  return {
    year,
    month,
    day,
    hour,
    minute,
    second
  }
}
// 获取指定年月日获取日期
const getDate = (year, month, day) => {
  return new Date(year, month, day);
}
export {
  getNewDate,
  getDate
}
