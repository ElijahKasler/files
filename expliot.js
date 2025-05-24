/// execute_script.js
let hasRun = false;

window.addEventListener("keydown", event => {
  if (event.code === "ShiftRight" && !event.repeat && !hasRun) {
    let code = `alert("hi")`;
    eval(code);
    hasRun = true;
  }
});
