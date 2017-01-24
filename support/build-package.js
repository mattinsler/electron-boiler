const fs = require('fs');
const path = require('path');

const pkg = require(path.join(__dirname, '..', 'package.json'));
delete pkg.devDependencies;
delete pkg.scripts;

fs.writeFileSync(
  path.join(__dirname, '..', 'build', 'package.json'),
  JSON.stringify(pkg, null, 2)
);

console.log(pkg.name);
