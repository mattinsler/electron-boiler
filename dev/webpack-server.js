import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import config from '../webpack.config.js';

const app = express();
const port = 46918;

if (!config.plugins) { config.plugins = []; }
config.plugins.push(new webpack.HotModuleReplacementPlugin());

if (!Array.isArray(config.entry)) { config.entry = [config.entry]; }
config.entry.unshift(`webpack-hot-middleware/client?path=http://127.0.0.1:${port}/__webpack_hmr&timeout=20000&reload=true`);

config.devtool = 'inline-sourcemap';

const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler));
app.use(webpackHotMiddleware(compiler, {
  path: '/__webpack_hmr',
  heartbeat: 10 * 1000
}));

app.get('/', (req, res) => {
  res.end(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title></title>
    </head>
    <body>
      <script src="http://127.0.0.1:${port}/bundle.js"></script>
    </body>
    </html>
  `);
});

export function start() {
  return new Promise((resolve, reject) => {
    app.listen(port, (err) => {
      if (err) { return reject(err) }
      resolve(port);
    });
  });
}
