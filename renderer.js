
console.log(window.electronAPI); // Should log the exposed API with `minimize` and `close` methods

window.onload = () => {
  document.getElementById('App-Button-Minimize').addEventListener('click', () => {
    window.electronAPI.minimizeWindow();
  });
  
  document.getElementById('App-Button-Close').addEventListener('click', () => {
    window.electronAPI.closeWindow();
  });
  
  // Display and current value for the calculator
  let currentValue = "";
  let operators = ['+', '-', '*', '/'];
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
    } else if (operators.includes(value)) {
      if (currentValue === '' || operators.includes(currentValue.slice(-1))) {
        currentValue = ''; // Prevent starting with an operator
      } else {
        currentValue += value;
      }
      }
      else if (value === '=') {
        if (currentValue.trim() === '') {
          currentValue = '';
        } else {
          try {
            // Perform the calculation safely using eval (or a better method in real scenarios)
            currentValue = eval(currentValue).toString();
          } catch (e) {
            currentValue = 'Error'; // Handle invalid calculations
          }
        }
      } else if (value === '±') {
        currentValue = (parseFloat(currentValue) * -1).toString(); // Toggle the sign of the number
      } else {
      currentValue += value; // Append the pressed button's value to the current value
    }
    
    display.innerText = currentValue; // Update the display
  };
};