var fs = require('fs');
var sysPath = require('path');

var cwd = process.cwd();
var pkgPath = sysPath.join(cwd, 'package.json');
var pkg = require(pkgPath);

pkg.name += '-china';
pkg.description += '(免翻墙国情增强版)';
pkg.repository.url = 'https://github.com/EdwonLim/node-sass-china.git';
pkg.author = {
    "name": "EdwonLim",
    "email": "edwon.lim@gmail.com",
    "url": "http://edwon.engineer/"
};
pkg.main = 'index.js';
pkg.nodeSassConfig.binarySite = 'https://npm.taobao.org/mirrors/node-sass';
delete pkg.scripts.prepublish;

fs.writeFileSync(pkgPath, JSON.stringify(pkg, {}, 2), 'UTF-8');
fs.writeFileSync(sysPath.join(cwd, 'index.js'), fs.readFileSync(sysPath.join(__dirname, 'files/index.js'), 'UTF-8'), 'UTF-8');
fs.writeFileSync(sysPath.join(cwd, 'bin/node-sass'), fs.readFileSync(sysPath.join(cwd, 'bin/node-sass'), 'UTF-8').replace("sass = require('../lib')", "sass = require('../index.js')"), 'UTF-8');
fs.writeFileSync(sysPath.join(cwd, 'README.md'), fs.readFileSync(sysPath.join(__dirname, 'files/intro.md'), 'UTF-8') + fs.readFileSync(sysPath.join(cwd, 'README.md'), 'UTF-8'), 'UTF-8');
