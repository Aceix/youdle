import { app, BrowserWindow, ipcMain } from 'electron';
import shell from 'shelljs';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { resolve } from 'dns';

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\');
}

const appDataDirectory = path.join(os.homedir(), '.youdle');
const configFilePath = path.join(os.homedir(), '.youdle', 'config.json');
let mainWindow;
let appConfig;
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`;

function loadConfig() {
  try{
    fs.access(configFilePath, (err) => {
      if(err && err.errno === -2){
        console.log('yaaaas');
        const defaultConfig = {
          downloadsDirectory: path.join(os.homedir(), 'Videos'),
          videoQuality: {
            name: '720p',
            code: '22'
          }
        };
        fs.mkdir(appDataDirectory, err => {
          if(err)
            return console.log(err);  
          fs.writeFile(configFilePath, JSON.stringify(defaultConfig), {
            flag: 'w+'
          }, (err) => {
            appConfig = defaultConfig;
            if(err)
              return console.log(err);
          });
        });
      }
      else{
        if(err)
          return console.log(err);
        fs.readFile(configFilePath, (err, data) => {
          if(err)
            return console.log(err);
          appConfig = JSON.parse(data.toString());
        });
      }
    });
  }
  catch(e){
    console.log(e);
  }
}

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    minHeight: 245,
    minWidth: 1000,
    width: 1000,
    useContentSize: true
  });

  mainWindow.loadURL(winURL);
  
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', launchInfo => {
  loadConfig();
  createWindow();
});

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
  const shellOptions = {
    async: true,
    cwd: appConfig.downloadsDirectory
  };

  // check if youtube-dl is not found
  const cp = shell.exec(`youtube-dl -f ${appConfig.videoQuality.code} ${url}`, shellOptions, (exitCode, stdout, stderr) => {
    console.log('Exit code:', exitCode);
    // console.log('Program output:', stdout);
    // console.log('Program stderr:', stderr);
  });
  cp.stdout.on('data', chunk => {
    mainWindow.webContents.send('yt-status', String(chunk));
  });
  // cp.stdout.on('close', () => {});
});
ipcMain.on('vue-app-ready', (evt) => {
  mainWindow.webContents.send('config-updated', appConfig);
});
ipcMain.on('update-config', (evt, newConfig) => {
  // first check if new directory exists
  fs.access(newConfig.downloadsDirectory, err => {
    if(err){
      evt.sender.send('update-config-error', err);
      console.log(err.toString());
      return;
    }
    fs.writeFile(configFilePath, JSON.stringify({...appConfig, ...newConfig}), err => {
      if(err){
        evt.sender.send('update-config-error', err);
        console.log(err);
        return;
      }
      (async () => {
        await loadConfig();
        mainWindow.webContents.send('config-updated', appConfig);
      })();
    });
  });
});
