#!/bin/sh

rm -rf build dist

babel server -d build/server
find server -type file | grep -v '\.js$' | xargs cp {} build/server/ \;

NODE_ENV=production webpack -p

echo "process.env.NODE_ENV = 'production'; require('./server/main').start(123);" > build/index.js

name=$(node support/build-package.js)
cd build
yarn
cd ..

electron-packager build "$name" --out=dist/osx --platform=darwin --arch=x64 --electronVersion=1.4.13
