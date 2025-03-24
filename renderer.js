const { ipcRenderer } = require('electron');

const minimizeButton = document.getElementById('minimize');
const closeButton = document.getElementById('close');

minimizeButton.addEventListener('click', () => {
  ipcRenderer.send('minimize-window'); // Send a message to the main process
});

closeButton.addEventListener('click', () => {
  ipcRenderer.send('close-window'); // Send a message to the main process
});