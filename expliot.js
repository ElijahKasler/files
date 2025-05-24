/// execute_script.js
window.addEventListener("keydown", event => {
  if (event.code === "ShiftRight" ) {
    let code = `alert("hi")`;
    eval(code);
  }
});
