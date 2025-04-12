const { contextBridge, ipcRenderer } = require('electron');
const { Parser } = require('expr-eval') // import expr-eval for expression evaluation
console.log(Parser);

contextBridge.exposeInMainWorld('electron', {
  minimizeWindow: () => ipcRenderer.send('minimize-window'),
  closeWindow: () => ipcRenderer.send('close-window'),
});

contextBridge.exposeInMainWorld('exprEval', {
  Parser: Parser // Expose the Parser class from expr-eval to the renderer process
})