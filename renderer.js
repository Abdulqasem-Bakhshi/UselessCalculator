const { ipcRenderer } = require('electron');

window.onload = () => {

// Close and Minimize buttons
const minimizeButton = document.getElementById('minimize');
const closeButton = document.getElementById('close');

// Minimize window
minimizeButton.addEventListener('click', () => {
  ipcRenderer.send('minimize-window');
});

// Close window
closeButton.addEventListener('click', () => {
  ipcRenderer.send('close-window');
});
};