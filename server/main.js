import { app, BrowserWindow } from 'electron';

class Application {
  ready = false;
  port = null;
  mainWindow = null;

  constructor(environment) {
    this.environment = environment;

    app.on('ready', this.onReady);
    app.on('window-all-closed', app.quit);
  }

  onReady = () => {
    this.ready = true;
    this.boot();
  }

  start(port) {
    this.port = port;
    this.boot();
  }

  boot() {
    if (!this.port || !this.ready) { return; }

    this.mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      center: true
    });

    this.mainWindow.on('closed', () => mainWindow = null);

    if (this.environment === 'development') {
      this.mainWindow.loadURL(`http://127.0.0.1:${this.port}`);
      this.mainWindow.webContents.openDevTools('undocked');
    } else {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title></title>
      </head>
      <body>
        <script src="../client/bundle.js"></script>
      </body>
      </html>
      `;

      this.mainWindow.loadURL(`data:text/html;charset=utf-8,${encodeURI(html)}`);
    }
  }
}

const application = new Application(process.env.NODE_ENV || 'development');

export function start(port) {
  application.start(port);
}
