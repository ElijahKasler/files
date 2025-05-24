/// execute_script.js
window.addEventListener("keydown", event => {
  if (event.code === "ShiftRight" && !event.repeat && !hasRun) {
    let code = `alert("hi")`;
    eval(code);
  }
});
