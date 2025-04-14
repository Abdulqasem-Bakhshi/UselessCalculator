try {
  const { contextBridge, ipcRenderer } = require('electron');
  
  contextBridge.exposeInMainWorld('electronAPI', {
    minimize: () => ipcRenderer.send('minimize-window'),
    close: () => ipcRenderer.send('close-window'),
  });

  console.log('Electron API loaded.');
} catch (error) {
  console.warn('Electron API not available (likely running in browser)', error);
}