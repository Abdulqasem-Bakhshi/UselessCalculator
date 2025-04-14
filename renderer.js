window.onload = () => {
  const display = document.querySelector('.Display');
  let currentValue = '';

  // Window controls
  document.getElementById('App-Button-Minimize')?.addEventListener('click', () => {
    window.electronAPI.minimize();
  });

  document.getElementById('App-Button-Close')?.addEventListener('click', () => {
    window.electronAPI.close();
  });

  // Button logic
  window.buttonShow = (val) => {
    if (val === 'C') {
      currentValue = '';
    } else if (val === '=') {
      try {
        currentValue = eval(currentValue).toString();
      } catch {
        currentValue = 'Error';
      }
    } else if (val === '←') {
      currentValue = currentValue.slice(0, -1);
    } else {
      currentValue += val;
    }

    display.innerText = currentValue;
  };
};
