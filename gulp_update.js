var fs = require('fs');
var sysPath = require('path');

var cwd = process.cwd();
var pkgPath = sysPath.join(cwd, 'package.json');
var pkg = require(pkgPath);

pkg.name += '-china';
pkg.description += '(免翻墙国情版)';
pkg.repository.url = 'https://github.com/EdwonLim/gulp-sass-china';
pkg.author = "EdwonLim";
pkg.dependencies['node-sass-china'] = pkg.dependencies['node-sass'];
delete pkg.dependencies['node-sass'];

fs.writeFileSync(pkgPath, JSON.stringify(pkg, {}, 2), 'UTF-8');
fs.writeFileSync(sysPath.join(cwd, 'index.js'), fs.readFileSync(sysPath.join(cwd, 'index.js'), 'UTF-8').replace("require('node-sass')", "require('node-sass-china')"), 'UTF-8');
