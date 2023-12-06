// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    // width: 800,
    // height: 600,
    fullscreen: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // mainWindow.webContents.openDevTools();

  // and load the index.html of the app.
  mainWindow.loadFile('index.html');

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

app.webContents.setWindowOpenHandler((options) => {
  if (options.frameName.startsWith('child_win')) {
    return {
      action: 'allow',
      overrideBrowserWindowOptions: {
        parent: app,
        fullscreen: true,
        frame: false,
        transparent: true,
        minimizable: false,
        resizable: false,
        maximizable: false,
        center: true,
        skipTaskbar: true,
        width: 100,
        height: 100,
        movable: false,
        alwaysOnTop: true
      }
    };
  }
  return { action: 'deny' };
});
win.webContents.on('did-create-window', (newWin) => {
  newWin.setIgnoreMouseEvents(true);
  newWin.setAlwaysOnTop(true, 'pop-up-menu');
});
