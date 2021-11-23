(() => {
  const beginBtn = document.querySelector("#begin")

  const endBtn = document.querySelector("#end")

  const box = document.querySelector("#box")


  let myRef;

  beginBtn.addEventListener("click", () => {
    myRef = requestAnimationFrame(test)
  })

  endBtn.addEventListener("click", () => {
    cancelAnimationFrame(myRef)
  })

  function test() {
    box.style.width = `${myRef}%`
    myRef = requestAnimationFrame(test)
  }
})()