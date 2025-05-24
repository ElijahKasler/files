/// execute_script.js
(() => {
  const applyStyles = (el, styles) => Object.assign(el.style, styles);

  const overlay = document.createElement('div');
  applyStyles(overlay, {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.4)',
    zIndex: 99999998,
    display: 'none',
  });
  document.body.appendChild(overlay);

  const menu = document.createElement('div');
  applyStyles(menu, {
    position: 'fixed',
    top: '0px',
    left: '0px',
    width: '280px',
    backgroundColor: '#222',
    color: '#eee',
    fontFamily: 'Arial, sans-serif',
    borderRadius: '6px',
    boxShadow: '0 0 10px rgba(0,0,0,0.6)',
    userSelect: 'none',
    zIndex: 99999999,
    cursor: 'default',
    display: 'none',
  });
  const header = document.createElement('div');
  header.textContent = 'Toggle Menu';
  applyStyles(header, {
    padding: '10px',
    backgroundColor: '#444',
    fontWeight: 'bold',
    cursor: 'grab',
  });
  menu.appendChild(header);
  const togglesContainer = document.createElement('div');
  applyStyles(togglesContainer, { padding: '10px', maxHeight: '300px', overflowY: 'auto' });
  menu.appendChild(togglesContainer);
  document.body.appendChild(menu);

  let isDragging = false, dragOffsetX = 0, dragOffsetY = 0;
  header.addEventListener('mousedown', e => {
    isDragging = true;
    dragOffsetX = e.clientX - menu.getBoundingClientRect().left;
    dragOffsetY = e.clientY - menu.getBoundingClientRect().top;
    document.body.style.userSelect = 'none';
    header.style.cursor = 'grabbing';
  });
  window.addEventListener('mouseup', () => {
    isDragging = false;
    document.body.style.userSelect = '';
    header.style.cursor = 'grab';
  });
  window.addEventListener('mousemove', e => {
    if (!isDragging) return;
    let x = e.clientX - dragOffsetX;
    let y = e.clientY - dragOffsetY;
    x = Math.min(Math.max(0, x), window.innerWidth - menu.offsetWidth);
    y = Math.min(Math.max(0, y), window.innerHeight - menu.offsetHeight);
    menu.style.left = x + 'px';
    menu.style.top = y + 'px';
  });

  let scottIframe = null, scottNotch = null;
  function createScottWindow() {
    if (scottIframe) return;

    scottIframe = document.createElement('iframe');
    scottIframe.src = 'https://web.iwishyouamerrynewyear.com';
    applyStyles(scottIframe, {
      position: 'fixed',
      top: '24px',
      left: '0',
      width: '100vw',
      height: 'calc(100vh - 24px)',
      border: 'none',
      zIndex: 99999997,
      display: 'none',
    });
    document.body.appendChild(scottIframe);

    scottNotch = document.createElement('div');
    scottNotch.textContent = 'Scott';
    applyStyles(scottNotch, {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100vw',
      height: '24px',
      lineHeight: '24px',
      backgroundColor: '#222',
      color: '#eee',
      fontFamily: 'Arial, sans-serif',
      fontWeight: 'bold',
      fontSize: '14px',
      textAlign: 'center',
      boxShadow: '0 2px 6px rgba(0,0,0,0.5)',
      zIndex: 99999998,
      display: 'none',
      userSelect: 'none',
      pointerEvents: 'none',
      padding: '0 12px',
    });
    document.body.appendChild(scottNotch);
  }

  function toggleScott(show) {
    if (!scottIframe) createScottWindow();
    scottIframe.style.display = show ? 'block' : 'none';
    scottNotch.style.display = show ? 'block' : 'none';
  }
  
  let consoleDiv = null;
  function createConsole() {
    if (consoleDiv) return;

    consoleDiv = document.createElement('div');
    applyStyles(consoleDiv, {
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      width: '400px',
      height: '300px',
      backgroundColor: '#1e1e1e',
      color: 'white',
      fontFamily: 'monospace',
      fontSize: '14px',
      boxShadow: '0 0 10px rgba(0,0,0,0.8)',
      borderRadius: '5px',
      display: 'flex',
      flexDirection: 'column',
      userSelect: 'none',
      zIndex: 99999999,
    });

    const header = document.createElement('div');
    applyStyles(header, {
      backgroundColor: '#333',
      padding: '5px 10px',
      cursor: 'move',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderTopLeftRadius: '5px',
      borderTopRightRadius: '5px',
    });
    header.textContent = 'Console';

    const closeBtn = document.createElement('button');
    closeBtn.textContent = '×';
    applyStyles(closeBtn, {
      background: 'transparent',
      border: 'none',
      color: 'white',
      fontSize: '20px',
      lineHeight: '20px',
      cursor: 'pointer',
      userSelect: 'none',
    });
    closeBtn.title = 'Close Console';
    closeBtn.onclick = () => {
      document.body.removeChild(consoleDiv);
      consoleDiv = null;
      toggleConsoleCheckbox.checked = false;
    };

    header.appendChild(closeBtn);
    consoleDiv.appendChild(header);

    const output = document.createElement('div');
    applyStyles(output, {
      flex: '1',
      padding: '10px',
      backgroundColor: '#121212',
      overflowY: 'auto',
      whiteSpace: 'pre-wrap',
    });
    consoleDiv.appendChild(output);

    const input = document.createElement('input');
    applyStyles(input, {
      border: 'none',
      outline: 'none',
      padding: '8px 10px',
      fontSize: '14px',
      fontFamily: 'monospace',
      color: 'white',
      backgroundColor: '#222',
      borderBottomLeftRadius: '5px',
      borderBottomRightRadius: '5px',
    });
    input.placeholder = 'Type JavaScript and press Enter...';
    consoleDiv.appendChild(input);

    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        const code = input.value.trim();
        if (!code) return;

        appendOutput('> ' + code, 'command');

        try {
          let result = eval(code);
          if (typeof result === 'object') {
            result = JSON.stringify(result, null, 2);
          }
          appendOutput(result, 'result');
        } catch (err) {
          appendOutput(err.message, 'error');
        }

        input.value = '';
        output.scrollTop = output.scrollHeight;
      }
    });

    function appendOutput(text, type) {
      const line = document.createElement('div');
      line.textContent = text;
      if (type === 'error') line.style.color = '#ff5555';
      else if (type === 'command') line.style.color = '#88f';
      else if (type === 'result') line.style.color = '#eee';
      output.appendChild(line);
    }

    // Dragging
    let dragging = false;
    let offsetX, offsetY;
    header.addEventListener('mousedown', e => {
      dragging = true;
      const rect = consoleDiv.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;
      document.body.style.userSelect = 'none';
    });
    window.addEventListener('mouseup', () => {
      dragging = false;
      document.body.style.userSelect = '';
    });
    window.addEventListener('mousemove', e => {
      if (!dragging) return;
      let x = e.clientX - offsetX;
      let y = e.clientY - offsetY;
      x = Math.min(Math.max(0, x), window.innerWidth - consoleDiv.offsetWidth);
      y = Math.min(Math.max(0, y), window.innerHeight - consoleDiv.offsetHeight);
      consoleDiv.style.left = x + 'px';
      consoleDiv.style.top = y + 'px';
      consoleDiv.style.position = 'fixed';
      consoleDiv.style.right = 'auto';
      consoleDiv.style.bottom = 'auto';
    });

    document.body.appendChild(consoleDiv);
    input.focus();
  }

  function addToggle(labelText, onChange) {
    const label = document.createElement('label');
    applyStyles(label, { display: 'flex', alignItems: 'center', marginBottom: '8px', cursor: 'pointer' });
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.style.marginRight = '8px';
    checkbox.onchange = e => onChange(e.target.checked);
    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(labelText));
    togglesContainer.appendChild(label);
    return checkbox;
  }

  const toggleScottCheckbox = addToggle('Show Scott Window', show => {
    toggleScott(show);
  });

  const toggleConsoleCheckbox = addToggle('Show Console Window', show => {
    if (show) createConsole();
    else if (consoleDiv) {
      document.body.removeChild(consoleDiv);
      consoleDiv = null;
    }
  });

  window.addEventListener('keydown', e => {
    if (e.code === 'ShiftRight' && !e.repeat) {
      const visible = menu.style.display === 'block';
      if (visible) {
        menu.style.display = 'none';
        overlay.style.display = 'none';
      } else {
        menu.style.display = 'block';
        overlay.style.display = 'block';
      }
    }
  });

  overlay.addEventListener('click', () => {
    menu.style.display = 'none';
    overlay.style.display = 'none';
  });

  createScottWindow();
  createConsole();

  menu.style.display = 'none';
  overlay.style.display = 'none';
  toggleScott(false);
  if (consoleDiv) {
    document.body.removeChild(consoleDiv);
    consoleDiv = null;
  }
})();
