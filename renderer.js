window.onload = () => {
  console.log("renderer.js start");

  // Minimize and Close buttons
  const minimizeButton = document.getElementById('minimize');
  const closeButton = document.getElementById('close');

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
  const display = document.getElementById('display');

  // Define the buttonShow function globally to be called from HTML
  window.buttonShow = function (value) {
    if (value === 'C') {
      currentValue = ''; // Clear the current value
    } else if (value === '=') {
      try {
        // Perform the calculation safely using eval (or a better method in real scenarios)
        currentValue = eval(currentValue).toString();
      } catch (e) {
        currentValue = 'Error'; // Handle invalid calculations
      }
    } else if (value === '?') {
      currentValue = ":)";
    } else if (value === '%') {
      currentValue = (parseFloat(currentValue) / 100).toString(); // Handle percentage calculation
    } else if (value === '+/-') {
      currentValue = (parseFloat(currentValue) * -1).toString(); // Toggle the sign of the number
    } else {
      currentValue += value; // Append the pressed button's value to the current value
    }

    display.innerText = currentValue; // Update the display
  };

  console.log("renderer.js is loading");
};
