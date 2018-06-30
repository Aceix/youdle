import cp from 'child_process';
import { app, BrowserWindow, ipcMain } from 'electron';

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\');
}

let mainWindow;
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`;

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000
  });

  mainWindow.loadURL(winURL);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('download', (evt, url) => {
  const yt = cp.execFile('youtube-dl', [
      '-f 22',
      url
    ], {
      shell: false,
      cwd: '~/Videos/YTD',
  }, (err, stdout, stderr) => {
    console.log('called');
    if(err)
      return console.log(err);
    console.log(stdout.toString());
    console.log('STDERR :: ' + stderr.toString());
  });
  yt.stdout.on('data', (data) => {
    console.log(data);
    // this.$emit('yt-status', data);
  });
});
