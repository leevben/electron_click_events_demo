/**
 * The preload script runs before. It has access to web APIs
 * as well as Electron's renderer process modules and some
 * polyfilled Node.js functions.
 *
 * https://www.electronjs.org/docs/latest/tutorial/sandbox
 */
const electron = require('electron');

console.log(electron);

const openNewWindow = () => {
  electron.ipcRenderer.send('open');
};

electron.contextBridge.exposeInMainWorld('openNewWindow', openNewWindow);
