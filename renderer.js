let currentValue = '';
let lastResult = '';

window.onload = () => {
  console.log('Window loaded. Binding buttons.');

  // Make buttonShow globally accessible for inline HTML `onclick` attributes
  window.buttonShow = function (value) {
    const display = document.querySelector('.Display');

    if (value === 'C') {
      currentValue = '';
      lastResult = '';
    } else if (value === "CE") {
      const parts = currentValue.match(/(\d+|\D)/g);
      if (parts) {
        parts.pop();  // Remove the last part
        currentValue = parts.join('');
      }
    } else if (value === '←') {
      currentValue = currentValue.slice(0, -1);
    } else if (value === '=') {
      try {
        if (window.exprEval) {  // Ensure exprEval is available
          const parser = new window.exprEval.Parser();
          lastResult = parser.evaluate(currentValue).toString();
          currentValue = lastResult;
        } else {
          throw new Error('exprEval is not available');
        }
      } catch (e) {
        currentValue = 'Error';
        console.log('Evaluation error:', e.message);
      }
    } else if (['+', '-', '*', '/'].includes(value)) {
      if (lastResult && currentValue === lastResult) {
        currentValue += value;  // Keep the last result if the current value is equal
      } else {
        currentValue += value;
      }
    } else if (value === '±') {
      if (!isNaN(currentValue)) {
        currentValue = (parseFloat(currentValue) * -1).toString();
      }
    } else {
      currentValue += value;
    }

    // Update the display
    if (display) {
      display.innerText = currentValue;
    }
  };

  // Attach window control buttons after DOM is ready
  document.getElementById('App-Button-Minimize')?.addEventListener('click', () => {
    window.electronAPI?.minimize?.();
  });

  document.getElementById('App-Button-Close')?.addEventListener('click', () => {
    window.electronAPI?.close?.();
  });
};
