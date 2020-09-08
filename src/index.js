const { app, BrowserWindow } = require('electron');
const appConfig = require('electron-settings');
const path = require('path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

function windowStateKeeper(windowName) {
  let window, windowState;

  windowState = {
    x: 560,
    y: 240,
    width: 1000,
    height: 800,
  };

  async function setBounds() {
    // Restore from appConfig
    if (await appConfig.has(`windowState.${windowName}`)) {
      windowState = await appConfig.get(`windowState.${windowName}`);
      return;
    }
  }

  async function saveState() {
    // if (!windowState.isMaximized) {
    //   windowState = window.getBounds();
    // }
    // windowState.isMaximized = window.isMaximized();

    console.log("yeet")
    try {
      await appConfig.set(`windowState.${windowName}`, windowState);
    } catch(e) {
      console.log("shi", e)
    }
    console.log("yaaw")
  }

  const toConsole = () => {
    console.log("YeetYaaww")
  }

  function track(win) {
    window = win;
    ['resize', 'move', 'close'].forEach(event => {
      win.on(event, saveState);
      // win.on(event, toConsole);
    });
  }

  setBounds();

  console.log("yaaw", windowState)

  return({
    x: windowState.x,
    y: windowState.y,
    width: windowState.width,
    height: windowState.height,
    isMaximized: windowState.isMaximized,
    track,
  });
}

// const test = async () => {
//   let window, winState;
//   if(await appConfig.has('windowState.main')){
//     winState = await appConfig.get('windowState.main');
//     console.log("yeet", winState)
//   }
// }
const test = () => {
  let window, winState;
  if(appConfig.has('windowState.main')){
    winState = appConfig.get('windowState.main');
    console.log("yeet", winState)
  }
}

const createWindow = () => {
  // const mainWindowStateKeeper = windowStateKeeper('main');
  // const mainWindow = new BrowserWindow({
  //   title: 'Main Window',
  //   x: mainWindowStateKeeper.x,
  //   y: mainWindowStateKeeper.y,
  //   width: mainWindowStateKeeper.width,
  //   height: mainWindowStateKeeper.height,
  //   show: false,
  //   webPreferences: {
  //     nodeIntegration: true
  //   }
  // });

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    title: 'Main Window',
    width: 1200,
    height: 800,
    show: false,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // mainWindowStateKeeper.track(mainWindow);

  // test();

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // graceful opening
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
