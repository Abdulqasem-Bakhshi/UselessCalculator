window.onload = () => {
  // Minimize and Close buttons
  const minimizeButton = document.getElementById('App-Button-Minimize');
  const closeButton = document.getElementById('App-Button-Close');

  // Minimize window
  minimizeButton.addEventListener('click', () => {
    window.electronAPI.minimizeWindow(); // Call the function exposed in preload.js
  });

  // Close window
  closeButton.addEventListener('click', () => {
    window.electronAPI.closeWindow(); // Call the function exposed in preload.js
  });

  // Display and current value for the calculator
  let currentValue = "";
  const display = document.querySelector('.Display');

  // Define the buttonShow function globally to be called from HTML
  window.buttonShow = function (value) {
    if (value === 'C') {
      currentValue = '';
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
        // Perform the calculation safely using eval (or a better method in real scenarios)
        currentValue = eval(currentValue).toString();
      } catch (e) {
        currentValue = 'Error'; // Handle invalid calculations
      }
    } else if (value === '±') {
      currentValue = (parseFloat(currentValue) * -1).toString(); // Toggle the sign of the number
    } else {
      currentValue += value; // Append the pressed button's value to the current value
    }

    display.innerText = currentValue; // Update the display
  };
};