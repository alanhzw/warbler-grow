/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-08-19 11:46:33
 * @LastEditTime: 2021-09-08 13:51:12
 * @FilePath: \Object.defineProperty\index.js
 */


(() => {
  const obj = {};
  const inputVal = document.getElementById("input");
  const div = document.getElementById("div");

  Object.defineProperty(obj, "name", {
    set: function(newVal) {
      inputVal.value = newVal;
      div.innerHTML = newVal
    }
  })
  inputVal.addEventListener("input", (e) => {
    obj.name = e.target.value;
  });
})()
