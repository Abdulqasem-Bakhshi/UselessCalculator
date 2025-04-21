const { contextBridge, ipcRenderer } = require('electron');
const { Parser } = require('expr-eval');
const path = require('path');  

contextBridge.exposeInMainWorld('Parser', {
  Parser: Parser,
});

contextBridge.exposeInMainWorld('electronAPI', {
  minimizeWindow: () => ipcRenderer.send('minimize-window'),
  closeWindow: () => ipcRenderer.send('close-window'),
});

let Parser;
try {
  Parser = require('expr-eval').Parser;
} catch (e) {
  console.error("Failed to require expr-eval:", e);
}

console.log("Parser loaded:", Parser);