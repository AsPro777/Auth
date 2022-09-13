const electron = require('electron')
const { BrowserWindow, Menu, dialog, BrowserView,ipcMain } = require('electron');
const path = require('path');
const url = require ('url');

let a='';

// eslint-disable-next-line no-undef
createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    fullscreenable: true,
    frame: false,
    backgroundColor:'#000000',
    webPreferences: {
      nodeIntegration: true,
      preload: __dirname + '/preload.js',
      enableRemoteModule: true,
      webviewTag: true,
      contextIsolation: false,
      nodeIntegrationInSubFrames: true,
      nodeIntegrationInWorker: true,
    },
  });

  /*const winVideo = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor:'#000000',
    //frame: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      webviewTag: true,
      contextIsolation: false,
      nodeIntegrationInSubFrames: true,
      nodeIntegrationInWorker: true,
    },
  });*/


  const viewSettings = new electron.BrowserView();
  win.addBrowserView(viewSettings);
  viewSettings.setBounds({ x: 0, y: 40, width: 800, height: 600 })
  viewSettings.setAutoResize({
    width: true,
    height: true
  })
  const settingsUrl = process.env.ELECTRON_START_SETTINGS_URL || ('file://' + path.join(__dirname, '../index.html#settings'));
  viewSettings.webContents.loadURL(settingsUrl);


  const viewCockpit = new electron.BrowserView();
  win.addBrowserView(viewCockpit);
  viewCockpit.setBounds({ x: 0, y: 40, width: 800, height: 600 })
  viewCockpit.setAutoResize({
    width: true,
    height: true,
  })
  const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '../index.html'),
    protocol: 'file',
    slashes: true
  });
  viewCockpit.setBackgroundColor("#000000");
  viewCockpit.webContents.loadURL(startUrl);



  const viewMenu = new electron.BrowserView({webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      webviewTag: true,
      contextIsolation: false,
      nodeIntegrationInSubFrames: true,
      nodeIntegrationInWorker: true,
      preload: __dirname + '/preload.js'
    }});
  win.addBrowserView(viewMenu);
  viewMenu.setBounds({
    x: 0,
    y: 0,
    width: 800,
    height: 40,
  })
  viewMenu.setAutoResize({
    width: true
  })
  viewMenu.webContents.loadURL(url.format({
    pathname: path.join(__dirname, '/electron-tabs.html'),
    protocol: 'file',
    slashes: true,
  }));
  //viewMenu.webContents.openDevTools({ mode: 'detach' });




  const authSettings = new electron.BrowserView({
    
    webPreferences: {
      nodeIntegration: true,
      preload: __dirname + '/preload.js',
      enableRemoteModule: true,
      webviewTag: true,
      contextIsolation: false,
      nodeIntegrationInSubFrames: true,
      nodeIntegrationInWorker: true,
    },
  });
  win.addBrowserView(authSettings);
  authSettings.setBounds({ x: 0, y: 40, width: 800, height: 600 })
  authSettings.setAutoResize({
    width: true,
    height: true
  })
  const authUrl =  ('file://' + path.join(__dirname, '../index.html#authorize'));
  authSettings.webContents.loadURL(authUrl);
  //authSettings.webContents.openDevTools({ mode: 'detach' });

  var css = ".App { background-color: dimgray; }"; 
  authSettings.webContents.insertCSS(css, {
    cssOrigin: 'author'
  }) ;


  win.maximize();

  //winVideo.loadURL('http://admin:Qwerty00@192.168.55.119:80/ISAPI/Streaming/channels/102/httpPreview')

  let mas=[authSettings,viewMenu,viewSettings,viewCockpit];
  return mas;

  //viewMenu.webContents.openDevTools({ mode: 'detach' });
  //win.loadURL(startUrl);


}


// eslint-disable-next-line no-undef
createWindowTest = () => {
  const win = new BrowserWindow({
    width: 1000,
    height: 1000,
    fullscreenable: true,
    backgroundColor: '#FFFF00',
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      webviewTag: true,
      /*contextIsolation: false,*/
    },
  });
}

  /*win.loadURL(url.format({
    //pathname: path.join(__dirname, '/electron-tabs.html'),
    pathname: path.join(__dirname ,'/index.html'), 
    protocol: 'file',
    slashes: true*/


