const environment = process.env.NODE_ENV || 'development';

Promise.resolve().then(() => {
  if (environment === 'development') {
    require('babel-core/register');
    const devserver = require('./dev/webpack-server');
    return devserver.start();
  }
}).then((port) => {
  require('./server/main').start(port);
}).catch((err) => {
  console.log(err.stack);
});
