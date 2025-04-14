try {
  const { contextBridge, ipcRenderer } = require('electron');
  const { Parser } = require('expr-eval');

  contextBridge.exposeInMainWorld('Parser', {
    Parser: Parser
  })
  
  contextBridge.exposeInMainWorld('electronAPI', {
    minimize: () => ipcRenderer.send('minimize-window'),
    close: () => ipcRenderer.send('close-window'),
    buttonShow: (value) => window.buttonShow(value),
  });

  console.log('Electron API loaded.');
} catch (error) {
  console.warn('Electron API not available (likely running in browser)', error);
}