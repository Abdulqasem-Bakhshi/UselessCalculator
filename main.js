const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipcMain = electron.ipcMain;
const path = require('path'); // import path module for preload

let mainWindow;

function createWindow() {
  if (mainWindow) {
    return;
  }

}
function mainWindowRes() {
  mainWindow = new BrowserWindow({
    width: 300,
    height: 425,
    frame: false,
    resizable: false,
    icon: __dirname + '/icon.png',
    webPreferences: {
      devTools: false,
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
  });

  mainWindow.loadFile('Calc.html');
};

app.on('ready', mainWindowRes);

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

// Handle the single instance lock
const gotLock = app.requestSingleInstanceLock();

if (!gotLock) {
  // If another instance is running, quit the app
  app.quit();
} else {
  app.whenReady().then(() => {
    // Create the main window
    createWindow();

    // This will handle the behavior when another instance tries to start
    app.on('second-instance', (event, argv, cwd) => {
      if (mainWindow) {
        if (mainWindow.isMinimized()) {
          mainWindow.restore();
        }
        mainWindow.focus();
      }
    });

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
})})};