// Modules to control application life and create native browser window






const electron = require('electron')
const {app, BrowserWindow, ipcMain} = require('electron')

const  remote = require('electron').remote;






//require('./ipcmain');
//for not windows "start": "export BROWSER=none && react-scripts start"






require('./cwnd');
let mas=[];/*массив объектов BrowserView */





// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
/*app.whenReady().then(() => {
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    // eslint-disable-next-line no-undef
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})*/



/*ipcMain.handle('quit', (info) => {
  
  app.quit('quit');

});*/

/*После регистрации пользователя в переменную wnd заносим главное окно. Тк массив дочерних окон у нас заполнен ранее (при запуске приложения) то в зависимости от роли пользователя можно
добавлять нужные дочерние окна из массива mas в основное окно через addBrowserView */
ipcMain.on('update-value', (event, arg) => {
      console.log(arg);
           
      var wnd = BrowserWindow.getFocusedWindow();

      if(arg=='user') { //пользователю user не будет видно настроек
        wnd.addBrowserView(mas[3]);
        wnd.removeBrowserView(mas[0]);

        /*скрываем одни элементы в панели меню и показываем другие */
        mas[1].webContents.executeJavaScript('document.querySelector(".tab-1").classList.remove("classHide"); document.querySelector(".tab-1").classList.add("classShow");   ');
        mas[1].webContents.executeJavaScript('document.querySelector(".tab-5").classList.remove("classHide"); document.querySelector(".tab-5").classList.add("classShow");  ');
        mas[1].webContents.executeJavaScript('document.querySelector(".tab-3").classList.remove("classHide"); document.querySelector(".tab-3").classList.add("classShow");  ');
        mas[1].webContents.executeJavaScript('document.querySelector(".tab-4").classList.remove("classHide"); document.querySelector(".tab-4").classList.add("classShow");  ');

        mas[1].webContents.executeJavaScript('document.querySelector(".tab-5").innerHTML="'+arg+'";');//вывести имя пользователя в нужный div
      }

      if(arg=='admin') { //пользователю admin видно все
        wnd.addBrowserView(mas[2]);
        wnd.addBrowserView(mas[3]);
        wnd.removeBrowserView(mas[0]);

        mas[1].webContents.executeJavaScript('document.querySelector(".tab-1").classList.remove("classHide"); document.querySelector(".tab-1").classList.add("classShow");  ');
        mas[1].webContents.executeJavaScript('document.querySelector(".tab-2").classList.remove("classHide"); document.querySelector(".tab-2").classList.add("classShow");  ');
        mas[1].webContents.executeJavaScript('document.querySelector(".tab-5").classList.remove("classHide"); document.querySelector(".tab-5").classList.add("classShow");   ');
        mas[1].webContents.executeJavaScript('document.querySelector(".tab-3").classList.remove("classHide"); document.querySelector(".tab-3").classList.add("classShow");   ');
        mas[1].webContents.executeJavaScript('document.querySelector(".tab-4").classList.remove("classHide"); document.querySelector(".tab-4").classList.add("classShow");  ');

        mas[1].webContents.executeJavaScript('document.querySelector(".tab-5").innerHTML="'+arg+'";');
      }

      event.reply('qwe', arg);
  })

/*сперва когда только загружается приложение вызываем  createWindow(). В ней мы собираем массив из дочерних экранов и возвращаем его. Этот массив заносим в mas. */
app.on('ready', function () {
   mas=createWindow();


});



// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
/*app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})*/
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
