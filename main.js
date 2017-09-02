// ./main.js
const {app, BrowserWindow} = require('electron');

let win = null;

app.on('ready', function () {

  // Initialize the window to our specified dimensions
  win = new BrowserWindow({
    width: 1000, height: 600,
    minWidth: 800, minHeight: 600
    // frame: false
    // titleBarStyle: 'hidden'
  });

  // Specify entry point
  win.loadURL('http://monolith:4200');

  // Show dev tools
  // Remove this line before distributing
  // win.webContents.openDevTools();

  win.once('ready-to-show', () => {
    win.show()
  });

  // Remove window once app is closed
  win.on('closed', function () {
    win = null;
  });

});

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
