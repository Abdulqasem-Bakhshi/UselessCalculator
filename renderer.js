window.onload = () => {
  console.log('expr-eval file', window['expr-eval']);
  // Minimize and Close buttons
  const minimizeButton = document.getElementById('App-Button-Minimize');
  const closeButton = document.getElementById('App-Button-Close');
  const parser = window.exprEval.Parser; // Access the Parser class from expr-eval

  // Minimize window
  minimizeButton.addEventListener('click', () => {
    window.electron.minimizeWindow(); // Call the function exposed in preload.js
  });

  // Close window
  closeButton.addEventListener('click', () => {
    window.electron.closeWindow(); // Call the function exposed in preload.js
  });

  // Display and current value for the calculator
  let currentValue = "";
  let lastResult = '';
  const display = document.querySelector('.Display');

  // Define the buttonShow function globally to be called from HTML
  window.buttonShow = function (value) {
    if (value === 'C') {
      currentValue = '';
      lastResult = '';
    } else if (value === "CE") {
      const parts = currentValue.match(/(\d+|\D)/g);
      if (parts) {
        parts.pop(); // Remove the last part
        currentValue = parts.join(''); // Rejoin the remaining parts
      }
    } else if (value === '←') {
      currentValue = currentValue.slice(0, -1);
    }
    else if (value === '=') {
      try {
        lastResult = parser.evaluate(currentValue).toString(); // Evaluate the expression and convert to string
        currentValue = lastResult; // Store the last result
      } catch (e) {
        currentValue = 'Error'; // Handle invalid calculations
        console.log('Evaluation error:', e.message);
      }
    } else if (['+', '-', '*', '/'].includes(value)) {
      if (lastResult && currentValue === lastResult) {
        currentValue += value; // If the last result is the same as the current value, keep it
      } else {
        currentValue += value; // Append the operator to the current value
      }
    }
    else if (value === '±') {
      currentValue = (parseFloat(currentValue) * -1).toString(); // Toggle the sign of the number
    } else {
      currentValue += value;
      if (currentValue) {

      }// Append the pressed button's value to the current value
    }

    display.innerText = currentValue; // Update the display
  };
};
