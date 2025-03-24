const { app, BrowserWindow, ipcMain } = require('electron');

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 300,
    height: 411,
    frame: false,
    resizable: false,
    icon: __dirname + '/icon.png',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false, // Required for ipcRenderer to work
    },
  });

  mainWindow.loadFile('Calc.html');
});

// Listen for minimize and close events from the renderer process
ipcMain.on('minimize-window', () => {
  if (mainWindow) {
    mainWindow.minimize();
  }
});

ipcMain.on('close-window', () => {
  if (mainWindow) {
    mainWindow.close();
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});